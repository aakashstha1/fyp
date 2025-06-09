"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ForumView() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [threads, setThreads] = useState([]);

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

    // Simulate network request
    setTimeout(() => {
      try {
        const mockResponse = {
          id: Date.now(),
          title,
          content,
          author: "demo-user",
          createdAt: new Date().toISOString(),
        };

        setThreads((prev) => [mockResponse, ...prev]);
        setTitle("");
        setContent("");
        setSuccessMessage("Your thread was successfully posted!");
      } catch (err) {
        setErrorMessage("Failed to post the thread. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="p-4">
      <Card className="max-w-2xl mx-auto shadow-lg border border-muted p-4 mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Enter thread title"
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
            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Thread"}
            </Button>

            {/* Inline messages */}
            {successMessage && (
              <p className="text-green-600 font-medium">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 font-medium">{errorMessage}</p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Posted Threads Displayed Below Form */}
      <div className="mt-6 space-y-4 max-w-2xl mx-auto">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="p-4 border rounded shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg mb-1">{thread.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{thread.content}</p>
            <span className="text-xs text-gray-500 block">
              by {thread.author} at{" "}
              {new Date(thread.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumView;