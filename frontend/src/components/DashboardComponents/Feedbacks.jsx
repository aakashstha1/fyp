"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const API_URL = "http://localhost:8000/api/feedback";

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [reviewingFeedback, setReviewingFeedback] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      setFeedbacks(res.data.feedbacks);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch feedbacks");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
      toast.success("Feedback deleted");
      fetchFeedbacks();
      setReviewingFeedback(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete feedback");
    }
  };

  const handleReview = (feedback) => {
    setReviewingFeedback(feedback);
  };

  const markAsReviewed = async (id) => {
    try {
      await axios.put(`${API_URL}/review/${id}`, {}, { withCredentials: true });
      toast.success("Feedback marked as reviewed");
      fetchFeedbacks();
      setReviewingFeedback(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark feedback as reviewed");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Photo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th> {/* Added Role */}
            <th className="p-2">Message</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f) => (
            <tr key={f._id} className="text-center border-t border-gray-200">
              <td className="p-2">
                <img
                  src={f.user?.imageUrl || "/default-avatar.png"}
                  alt={f.user?.name}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="p-2">{f.user?.name}</td>
              <td className="p-2">{f.user?.email}</td>
              <td className="p-2 capitalize">{f.user?.role}</td> {/* Show role */}
              <td className="p-2">{f.message}</td>
              <td className="p-2">{f.status}</td>
              <td className="p-2">
                <Button size="sm" onClick={() => handleReview(f)}>
                  Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show card when reviewing */}
      {reviewingFeedback && (
        <div className="mt-5 max-w-md mx-auto">
          <Card className="shadow-lg rounded-xl">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={reviewingFeedback.user?.imageUrl || "/default-avatar.png"}
                    alt={reviewingFeedback.user?.name}
                  />
                  <AvatarFallback>
                    {reviewingFeedback.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{reviewingFeedback.user?.name}</h3>
                  <p className="text-sm text-gray-500">{reviewingFeedback.user?.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{reviewingFeedback.user?.role}</p> {/* role */}
                </div>
              </div>
              <p className="text-gray-700">{reviewingFeedback.message}</p>
              <div className="flex gap-2 mt-2">
                {reviewingFeedback.status === "pending" && (
                  <Button
                    variant="outline"
                    onClick={() => markAsReviewed(reviewingFeedback._id)}
                  >
                    Mark as Reviewed
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(reviewingFeedback._id)}
                >
                  Delete
                </Button>
                <Button variant="secondary" onClick={() => setReviewingFeedback(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Feedbacks;
