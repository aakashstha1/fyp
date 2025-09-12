import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import CreateThread from "./CreateThread";
import PostCard from "./PostCard";
import CategoryFilter from "./CategoryFilter";
import { useAuth } from "@/contexts/AuthContext";
import { LoaderCircle } from "lucide-react";

const API = "http://localhost:8000/api/thread";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "technology", label: "Technology" },
  { id: "information-technology", label: "Information Technology" },
  { id: "business", label: "Business" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "loksewa", label: "Loksewa" },
  { id: "bridge-course", label: "Bridge Course" },
  { id: "other", label: "Others" },
];

function ForumView() {
  const { currentUser } = useAuth();

  // create modal state
  const [showModal, setShowModal] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createContent, setCreateContent] = useState("");
  const [createCategory, setCreateCategory] = useState(CATEGORIES[1].id);

  // list/filter state
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // feedback
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const observer = useRef();

  const fetchThreads = useCallback(
    async (pageNum = 1, cat = categoryFilter, append = false) => {
      try {
        setLoading(true);

        const res = await axios.get(`${API}/getFilteredThreads`, {
          params: { category: cat, page: pageNum, limit: 5 },
          withCredentials: true,
        });

        const formatted = (res.data.threads || []).map((t) => ({
          threadId: t._id,
          title: t.title,
          content: t.content,
          author: t.userId?.name ?? "Unknown",
          authorId: t.userId?._id,
          profile: t.userId?.imageUrl,
          createdAt: t.createdAt,
          likes: Array.isArray(t.likes) ? t.likes : [],
          comments: t.comments || [],
          category: t.category,
        }));

        setPosts((prev) => (append ? [...prev, ...formatted] : formatted));

        setHasMore(pageNum < (res.data.pagination?.totalPages || 1));
      } catch (err) {
        console.error("Failed to fetch threads:", err);
        setErrorMessage(
          err?.response?.data?.message || "Could not fetch threads."
        );
      } finally {
        setLoading(false);
      }
    },
    [categoryFilter]
  );

  useEffect(() => {
    setPage(1);
    fetchThreads(1, categoryFilter, false);
  }, [categoryFilter, fetchThreads]);

  // auto-hide messages
  useEffect(() => {
    if (successMessage || errorMessage) {
      const t = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [successMessage, errorMessage]);

  // IntersectionObserver for infinite scroll
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => {
            const nextPage = prev + 1;
            fetchThreads(nextPage, categoryFilter, true);
            return nextPage;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchThreads, categoryFilter]
  );

  // Create a new thread
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/create`,
        {
          title: createTitle,
          content: createContent,
          category: createCategory,
        },
        { withCredentials: true }
      );

      const newPost = {
        threadId: res.data.thread,
        title: createTitle,
        content: createContent,
        author: currentUser.name,
        authorId: currentUser._id,
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
        category: createCategory,
      };
      setPosts((prev) => [newPost, ...prev]);

      setCreateTitle("");
      setCreateContent("");
      setCreateCategory(CATEGORIES[1].id);
      setShowModal(false);
      setSuccessMessage(res.data.message || "Thread posted successfully!");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err?.response?.data?.message || "Failed to post the thread."
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete a thread
  const handleThreadDelete = async (threadId) => {
    try {
      await axios.delete(`${API}/deleteThread/${threadId}`, {
        withCredentials: true,
      });
      setPosts((prev) => prev.filter((p) => p.threadId !== threadId));
      setSuccessMessage("Thread deleted successfully");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err?.response?.data?.message || "Failed to delete the thread."
      );
    }
  };

  // Like toggler
  const toggleLike = async (threadId) => {
    try {
      const res = await axios.post(
        `${API}/toggleLike/${threadId}`,
        {},
        { withCredentials: true }
      );
      const newCount = res.data?.likesCount ?? null;

      setPosts((prev) =>
        prev.map((p) => {
          if (p.threadId !== threadId) return p;
          const me = currentUser._id;
          const hasLiked = p.likes.includes(me);
          let nextLikes = hasLiked
            ? p.likes.filter((id) => id !== me)
            : [...p.likes, me];

          if (typeof newCount === "number") {
            if (nextLikes.length !== newCount) {
              const dummy = Array(newCount).fill("_");
              nextLikes = hasLiked
                ? dummy.filter((_, i) => i !== 0)
                : [me, ...dummy.slice(1)];
            }
          }

          return { ...p, likes: nextLikes };
        })
      );
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to toggle like.");
    }
  };

  const handleCategoryChange = async (cat) => {
    setCategoryFilter(cat);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar Filter */}
        <aside className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 h-fit border border-gray-200 dark:border-gray-700">
          <CategoryFilter
            category={categoryFilter}
            onChange={(val) => handleCategoryChange(val)}
          />
        </aside>

        {/* Main */}
        <main>
          <Button
            onClick={() => setShowModal(true)}
            className="fixed bottom-8 right-8 px-6 py-3 rounded-full shadow-xl bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg font-medium"
          >
            + Create Post
          </Button>

          {/* Messages */}
          <div className="space-y-3 mb-6">
            {successMessage && (
              <div className="p-3 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded shadow">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="p-3 bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 rounded shadow">
                {errorMessage}
              </div>
            )}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post, index) => {
              if (index === posts.length - 1) {
                return (
                  <div ref={lastPostRef} key={post.threadId}>
                    <PostCard
                      post={post}
                      currentUser={currentUser}
                      onDelete={handleThreadDelete}
                      onToggleLike={toggleLike}
                      canDeleteThread={currentUser._id === post.authorId}
                    />
                  </div>
                );
              } else {
                return (
                  <PostCard
                    key={post.threadId}
                    post={post}
                    currentUser={currentUser}
                    onDelete={handleThreadDelete}
                    onToggleLike={toggleLike}
                    canDeleteThread={currentUser._id === post.authorId}
                  />
                );
              }
            })}
          </div>

          {/* Loading spinner when fetching next page */}
          {loading && (
            <div className="flex justify-center py-6">
              <LoaderCircle className="animate-spin h-7 w-7 text-gray-500" />
            </div>
          )}

          {!hasMore && !loading && posts.length > 0 && (
            <p className="text-center text-gray-500 py-4">
              No more post! 
            </p>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateThread
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
          title={createTitle}
          setTitle={setCreateTitle}
          content={createContent}
          setContent={setCreateContent}
          category={createCategory}
          setCategory={setCreateCategory}
          categories={CATEGORIES.filter((c) => c.id !== "all")}
          loading={loading}
        />
      )}
    </div>
  );
}

export default ForumView;
