"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CreateThread from "./CreateThread";

import ThreadCard from "./ThreadCard";

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
        <CreateThread
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
