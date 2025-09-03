"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CreateThread from "./CreateThread";
import ThreadCard from "./ThreadCard";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { toast } from "sonner";

function ForumView() {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        if (!currentUser?._id) return;

        const res = await axios.get(
          "http://localhost:8000/api/thread/all/threads",
          { params: { userId: currentUser._id } }
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
      } finally {
        setLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/thread/create", {
        userId: currentUser._id,
        title,
        content,
      });

      const newThread = {
        id: res.data.thread,
        title,
        content,
        author: currentUser.name,
        createdAt: new Date().toISOString(),
        comments: [],
      };

      setThreads((prev) => [newThread, ...prev]);
      setTitle("");
      setContent("");
      setSuccessMessage(res.data.message || "Thread posted successfully!");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setErrorMessage(
        err?.response?.data?.message ||
          "Something went wrong cannot post the thread"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleThreadDelete = async (threadId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/thread/deleteThread/${threadId}`,
        { withCredentials: true }
      );
      setThreads((prev) => prev.filter((Th) => Th.id !== threadId));
      toast(res.data.message || "Thread deleted successfully");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className="p-4 relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Create Post Button */}
      <Button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        + Create Post
      </Button>

      {/* Modal */}
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

      {/* Notifications */}
      <div className="mt-8 max-w-2xl mx-auto space-y-4">
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

        {/* Threads */}
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            currentUser={currentUser}
            handleThreadDelete={handleThreadDelete}
            thread={thread}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        ))}
      </div>
    </div>
  );
}

export default ForumView;
