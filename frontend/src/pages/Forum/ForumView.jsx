"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CreateThread from "./CreateThread";

import ThreadCard from "./ThreadCard";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

function ForumView() {
  const { currentUser } = useAuth();
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
    const fetchThreads = async () => {
      try {
        if (!currentUser?._id) return;

        const res = await axios.get(
          "http://localhost:8000/api/thread/all/threads",
          {
            params: {
              userId: currentUser._id,
            },
          }
        );

        const formattedThreads = res.data.threads.map((thread) => ({
          id: thread._id,
          title: thread.title,
          content: thread.content,
          author: thread.userId.name,
          createdAt: thread.createdAt,
          comments: thread.comments || [],
        }));

        setThreads(formattedThreads);
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      }
    };

    fetchThreads();
  }, [currentUser]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);
  // Thread handling posting thread
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/thread/create", {
        userId: currentUser._id,
        title,
        content,
      });

      setTitle("");
      setContent("");
      setSuccessMessage(res.data.message || "Thread posted successfully!");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setErrorMessage(
        err?.response?.data?.message ||
          "Something went wrong cannot Post the thread"
      );
    } finally {
      setLoading(false);
    }
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
        {successMessage && (
          <div className="p-3 bg-green-100 text-green-800 rounded shadow">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-3 bg-red-100 text-red-800 rounded shadow">
            {errorMessage}
          </div>
        )}
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            currentUser={currentUser}
            thread={thread}
            onComment={handleComment}
          />
        ))}
      </div>
    </div>
  );
}

export default ForumView;
