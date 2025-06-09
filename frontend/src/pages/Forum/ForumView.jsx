"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function ForumView() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [threads, setThreads] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    setTimeout(() => {
      try {
        const newThread = {
          id: Date.now(),
          title,
          content,
          author: "demo-user",
          createdAt: new Date().toISOString(),
        };
        setThreads((prev) => [newThread, ...prev]);
        setTitle("");
        setContent("");
        setSuccessMessage("Thread posted successfully!");
        setShowModal(false); // Close modal after success
      } catch (error) {
        setErrorMessage("Failed to post. Try again.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="p-4 relative min-h-screen bg-gray-50">
      {/* Floating Create Post Button */}
      <Button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Create Post
      </Button>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Create a New Thread</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Thread title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                disabled={loading}
                required
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Posting..." : "Post Thread"}
              </Button>
              {successMessage && (
                <p className="text-green-600">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-600">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Posted Threads */}
      <div className="mt-8 max-w-2xl mx-auto space-y-4">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <h3 className="font-semibold text-lg">{thread.title}</h3>
            <p className="text-sm text-gray-700 mt-1">{thread.content}</p>
            <span className="text-xs text-gray-500 block mt-2">
              by {thread.author} on{" "}
              {new Date(thread.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumView;
  