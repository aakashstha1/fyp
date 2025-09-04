"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

export default function AddQuizForm({ userId }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Quiz title is required.");
      return;
    }
    if (!file) {
      toast.error("CSV file is required.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);
      formData.append("userId", userId); // optional if backend uses JWT

      const res = await axios.post(
        "http://localhost:8000/api/quize/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // if you need cookies/auth
        }
      );

      toast.success(res.data.message || "Quiz uploaded successfully!");
      setTitle("");
      setFile(null);
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong while uploading the quiz.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-12 p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Add Quiz from CSV
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quiz Title */}
          <div>
            <Label className="mb-1">Quiz Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* CSV File Upload */}
          <div>
            <Label className="mb-1">Upload CSV File</Label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-gray-700 border border-gray-300 rounded px-3 py-2 cursor-pointer"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file:{" "}
                <span className="font-semibold">{file.name}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Uploading..." : "Upload Quiz"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
   