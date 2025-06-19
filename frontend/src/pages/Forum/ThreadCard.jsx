import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

function ThreadCard({ thread, currentUser }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(thread.comments || []);
  const [showCommentSection, setShowCommentSection] = useState(false);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/thread/addComment",
        {
          content: commentText,
          userId: currentUser._id,
          threadId: thread.id,
        }
      );
      setComments((prev) => [...prev, res.data.comment]);
      setCommentText("");
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  const handleCommentClick = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/thread/getComment/${thread.id}`
      );
      setComments(res.data.comments);
      console.log(res.data.comments);
    } catch (error) {
      console.error("Cannot get comments", error);
    }
    setShowCommentSection((prev) => !prev);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete("http://localhost:8000/api/thread/deleteComment", {
        data: {
          commentId,
          userId: currentUser._id,
        },
      });

      // Remove deleted comment from UI
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800">{thread.title}</h3>
      <p className="text-gray-700 mt-2">{thread.content}</p>
      <div className="text-sm text-gray-500 mt-1">
        by <span className="font-medium">{thread.author}</span> ·{" "}
        {new Date(thread.createdAt).toLocaleString()}
      </div>

      <div className="mt-6 border-t pt-4">
        <Button onClick={handleCommentClick} variant="outline">
          {showCommentSection ? "Hide Comments" : "View/Add Comments"}
        </Button>

        {showCommentSection && (
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2 text-gray-800">
              Comments
            </h4>

            {comments.length > 0 ? (
              <ul className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="bg-gray-100 rounded-lg p-3 text-sm shadow-sm relative"
                  >
                    <p className="text-gray-800">{comment.content}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      — {comment.userId?.name || "Anonymous"} ·{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>

                    {(currentUser._id === comment.userId?._id ||
                      currentUser._id === thread.userId) && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No comments yet. Be the first!
              </p>
            )}

            <form
              onSubmit={handleComment}
              className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1"
              />
              <Button type="submit" className="px-4 py-2">
                Post
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThreadCard;
