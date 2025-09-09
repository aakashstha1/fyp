"use client";

import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Trash2, Edit2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import ConfirmBox from "./ConfirmBox";

const API = "http://localhost:8000/api/thread";

export default function PostCard({
  post,
  currentUser,
  onDelete,
  onToggleLike,
  canDeleteThread,
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [likes, setLikes] = useState(
    Array.isArray(post.likes) ? post.likes : []
  );
  const [likedByMe, setLikedByMe] = useState(
    Array.isArray(post.likes) ? post.likes.includes(currentUser._id) : false
  );

  // Thread editing
  const [editingThread, setEditingThread] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [editCategory, setEditCategory] = useState(post.category);

  // Comment editing
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API}/getComment/${post.threadId}`, {
          withCredentials: true,
        });
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    fetchComments();
  }, [post.threadId]);

  useEffect(() => {
    if (Array.isArray(post.likes)) {
      setLikes(post.likes);
      setLikedByMe(post.likes.includes(currentUser._id));
    }
  }, [post.likes, currentUser._id]);

  const toggleLike = async () => {
    setLikedByMe((prev) => !prev);
    setLikes((prev) =>
      likedByMe
        ? prev.filter((id) => id !== currentUser._id)
        : [...prev, currentUser._id]
    );

    try {
      await onToggleLike(post.threadId);
    } catch (err) {
      setLikedByMe((prev) => !prev);
      setLikes((prev) =>
        !likedByMe
          ? prev.filter((id) => id !== currentUser._id)
          : [...prev, currentUser._id]
      );
    }
  };

  const editThread = async () => {
    try {
      const res = await axios.put(
        `${API}/updateThread/${post.threadId}`,
        { title: editTitle, content: editContent, category: editCategory },
        { withCredentials: true }
      );
      // Update UI
      setEditingThread(false);
      post.title = res.data.thread.title;
      post.content = res.data.thread.content;
      post.category = res.data.thread.category;
    } catch (error) {
      console.error("Failed to edit thread:", error);
    }
  };

  const addComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(
        `${API}/addComment/${post.threadId}`,
        { content: commentText.trim() },
        { withCredentials: true }
      );
      setComments((prev) => [res.data.comment, ...prev]);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const saveEdit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const res = await axios.put(
        `${API}/updateComment/${commentId}`,
        { content: editText.trim() },
        { withCredentials: true }
      );
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? res.data.comment : c))
      );
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = (commentId) => {
    setConfirmMessage("Are you sure you want to delete this comment?");
    setDeleteTarget(() => async () => {
      try {
        await axios.delete(`${API}/deleteComment/${commentId}`, {
          withCredentials: true,
        });
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      } catch (err) {
        console.error(err);
      }
    });
    setShowConfirm(true);
  };
  const handleDeleteThread = () => {
    setConfirmMessage(
      "Are you sure you want to delete this thread? This action cannot be undone."
    );
    setDeleteTarget(() => async () => {
      try {
        await onDelete(post.threadId);
      } catch (err) {
        console.error("Failed to delete thread:", err);
      }
    });
    setShowConfirm(true);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
            {post.author?.charAt(0) || "U"}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>

        {/* Thread Actions */}
        <div className="flex gap-2">
          {post.authorId === currentUser._id && !editingThread && (
            <button
              onClick={() => setEditingThread(true)}
              className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400"
              title="Edit Thread"
            >
              <Edit2 size={18} />
            </button>
          )}

          {canDeleteThread && (
            <button
              onClick={handleDeleteThread}
              className="text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
              aria-label="Delete post"
            >
              <Trash2 size={18} />
            </button>
          )}
          <ConfirmBox
            open={showConfirm}
            message={confirmMessage}
            onConfirm={async () => {
              if (deleteTarget) await deleteTarget();
              setShowConfirm(false);
            }}
            onCancel={() => setShowConfirm(false)}
          />
        </div>
      </div>

      {/* Body */}
      {editingThread ? (
        <div className="mb-3 space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="w-full rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Category"
          />

          <div className="flex gap-2">
            <button
              onClick={editThread}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={() => setEditingThread(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <span className="inline-block text-xs px-3 py-1 mb-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            #{post.category}
          </span>
          <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-2 whitespace-pre-wrap">
            {post.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 border-t border-gray-200 dark:border-gray-700 pt-3">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-2  px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
            likedByMe
              ? "text-red-600 dark:text-red-400"
              : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
          }`}
        >
          <Heart size={20} />
          <span className="text-gray-900 dark:text-white text-sm">
            {likes.length}
          </span>
        </button>

        <button
          onClick={() => setShowComments((s) => !s)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition"
        >
          <MessageCircle size={20} />
          <span className="text-gray-900 dark:text-white text-sm">
            {comments.length}
          </span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-4">
          <div className="space-y-3 mb-3">
            {comments.map((c) => {
              const mine = c.userId?._id === currentUser._id;
              return (
                <div
                  key={c._id}
                  className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 shadow-sm"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    {c.userId?.name?.charAt(0) || "U"}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {c.userId?.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(c.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    {editingId === c._id ? (
                      <div className="mt-1">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-2 text-sm resize-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                          autoFocus
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => saveEdit(c._id)}
                            className="px-3 py-1 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditText("");
                            }}
                            className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {c.content}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {mine && editingId !== c._id && (
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => {
                          setEditingId(c._id);
                          setEditText(c.content);
                        }}
                        className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteComment(c._id)}
                        className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* New Comment Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a comment…"
              className="flex-1 rounded-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addComment()}
            />
            <button
              onClick={addComment}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
