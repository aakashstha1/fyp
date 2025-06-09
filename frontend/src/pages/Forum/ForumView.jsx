"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function ThreadCard({ thread, onComment }) {
  const [commentText, setCommentText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onComment(thread.id, commentText);
    setCommentText("");
  };

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      <h3 className="font-semibold text-lg">{thread.title}</h3>
      <p className="text-sm text-gray-700 mt-1">{thread.content}</p>
      <span className="text-xs text-gray-500 block mt-2">
        by {thread.author} on {new Date(thread.createdAt).toLocaleString()}
      </span>

      <div className="mt-4 border-t pt-3">
        <h4 className="text-sm font-semibold mb-2">Comments</h4>
        {thread.comments.length > 0 ? (
          <ul className="space-y-2">
            {thread.comments.map((comment, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-800 bg-gray-100 p-2 rounded"
              >
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500">No comments yet.</p>
        )}

        <form
          onSubmit={handleComment}
          className="mt-2 flex items-center space-x-2"
        >
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1"
          />
          <Button type="submit" className="px-3">
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}

function CreateThreadModal({
  onClose,
  onSubmit,
  loading,
  successMessage,
  errorMessage,
  title,
  content,
  setTitle,
  setContent,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Create a New Thread
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="Thread title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            disabled={loading}
            required
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {loading ? "Posting..." : "Post Thread"}
          </Button>

          {/* Messages */}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}


function ForumView() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [threads, setThreads] = useState([
    {
      id: "1",
      title: "How Do You Stay Motivated During Online Courses?",
      content:
        "What keeps you going when the course gets tough or when you feel like giving up? I think a lot of us would benefit from some motivational tips or even funny stories.",
      author: "demo-user",
      createdAt: new Date().toISOString(),
      comments: [],
    },
    {
      id: "2",
      title: "Struggling with Focus? Let’s Talk Strategies.",
      content:
        "Lately I’ve been finding it hard to stay focused while studying from home. I’d love to hear how others stay consistent and what methods or tools help you the most. Let’s support each other!",
      author: "demo-user",
      createdAt: new Date().toISOString(),
      comments: [],
    },
    {
      id: "3",
      title: "Ask Anything: Open Discussion for Learners",
      content:
        "Have a question about coding, exams, motivation, or productivity? This thread is open for any learner looking for help or wanting to offer support. Let’s make this a friendly corner!",
      author: "demo-user",
      createdAt: new Date().toISOString(),
      comments: [],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    setTimeout(() => {
      try {
        const newThread = {
          id: Date.now().toString(),
          title,
          content,
          author: "demo-user",
          createdAt: new Date().toISOString(),
          comments: [],
        };
        setThreads((prev) => [newThread, ...prev]);
        setTitle("");
        setContent("");
        setSuccessMessage("Thread posted successfully!");
        setShowModal(false);
      } catch (error) {
        setErrorMessage("Failed to post. Try again.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleComment = (threadId, comment) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? { ...thread, comments: [...thread.comments, comment] }
          : thread
      )
    );
  };

  return (
    <div className="p-4 relative min-h-screen bg-gray-50">
      <Button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        + Create Post
      </Button>

      {showModal && (
        <CreateThreadModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          loading={loading}
          successMessage={successMessage}
          errorMessage={errorMessage}
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />
      )}

      <div className="mt-8 max-w-2xl mx-auto space-y-4">
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            onComment={handleComment}
          />
        ))}
      </div>
    </div>
  );
}

export default ForumView;
