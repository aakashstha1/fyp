"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import CreateThread from "./CreateThread";
import PostCard from "./PostCard";
import CategoryFilter from "./CategoryFilter";
import { useAuth } from "@/contexts/AuthContext";

// import { useAuth } from "@/contexts/AuthContext"; // uncomment if you have it
// const { currentUser } = useAuth();

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
  // MOCK currentUser if your context isn't wired here yet:
  const {currentUser} = useAuth();

  // create modal state
  const [showModal, setShowModal] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createContent, setCreateContent] = useState("");
  const [createCategory, setCreateCategory] = useState(CATEGORIES[1].id); // default any

  // list/filter state
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // feedback
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchThreads = useCallback(
    async (cat = categoryFilter) => {
      try {
        setLoading(true);

        const res = await axios.get(`${API}/getFilteredThreads`, {
          params: { category: cat },
          withCredentials: true,
        });

        const formatted = (res.data.threads || []).map((t) => ({
          threadId: t._id,
          title: t.title,
          content: t.content,
          author: t.userId?.name ?? "Unknown",
          authorId: t.userId?._id,
          createdAt: t.createdAt,
          likes: Array.isArray(t.likes) ? t.likes : [], // expecting array of userIds
          comments: t.comments || [],
          category: t.category,
        }));
        setPosts(formatted);
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
    fetchThreads();
  }, [fetchThreads]);

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

  // Create a new thread
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Backend expects category (mongoose requires it)
      const res = await axios.post(
        `${API}/create`,
        {
          title: createTitle,
          content: createContent,
          category: createCategory,
          // userId is taken from token on backend via verifyToken; no need to send
        },
        { withCredentials: true }
      );

      // Optimistically insert the new post at top
      const newPost = {
        threadId: res.data.thread, // _id returned
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

  // Like toggler: update state so UI changes instantly
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

          // Optimistic toggle for current user
          const me = currentUser._id;
          const hasLiked = p.likes.includes(me);
          let nextLikes = hasLiked
            ? p.likes.filter((id) => id !== me)
            : [...p.likes, me];

          // If API returns authoritative count, reconcile
          if (typeof newCount === "number") {
            // try to keep membership consistent with count, but in most cases
            // the toggle above + server count will already align:
            if (nextLikes.length !== newCount) {
              // Just set the count via placeholder ids to avoid drift (optional)
              const dummy = Array(newCount).fill("_");
              // Keep current user's like state correct:
              nextLikes = hasLiked
                ? dummy.filter((_, i) => i !== 0) // user removed like
                : [me, ...dummy.slice(1)]; // user added like
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

  // Change filter & refetch
  const handleCategoryChange = async (cat) => {
    setCategoryFilter(cat);
    await fetchThreads(cat);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar Filter */}
        <CategoryFilter
          category={categoryFilter}
          onChange={(val) => handleCategoryChange(val)}
        />

        {/* Main */}
        <main>
          {/* Create Button */}
          <Button
            onClick={() => setShowModal(true)}
            className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
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
          {loading ? (
            <div className="text-gray-600 dark:text-gray-300">Loading…</div>
          ) : posts.length === 0 ? (
            <div className="text-gray-600 dark:text-gray-300">
              No posts found.
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.threadId}
                  post={post}
                  currentUser={currentUser}
                  onDelete={handleThreadDelete}
                  onToggleLike={toggleLike}
                  canDeleteThread={currentUser._id === post.authorId}
                />
              ))}
            </div>
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
