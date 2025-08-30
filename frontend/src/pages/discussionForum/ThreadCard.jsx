import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { Delete } from "lucide-react";
import { Share2, MessageCircle, MessageSquareOff } from "lucide-react";

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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Thread Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
          {thread.author?.[0] || "U"}
        </div>
        <div className="ml-3">
          <p className="font-semibold text-gray-800">{thread.author}</p>
          <p className="text-xs text-gray-500">
            {new Date(thread.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Thread Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{thread.title}</h3>
        <p className="text-gray-700">{thread.content}</p>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 border-t border-gray-100 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={handleCommentClick}
        >
          <MessageCircle size={18} />
          {comments.length}
        </Button>
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={handleShare}
        >
          <Share2 size={18} />
        </Button>
      </div>

      {/* Comment Section */}
      {showCommentSection && (
        <div className="px-4 pb-4 space-y-4">
          {comments.length > 0 ? (
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="bg-gray-50 rounded-lg p-3 shadow-sm relative"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-sm">
                      {comment.userId?.name?.[0] || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mt-1">
                        {comment.userId?.name || "Anonymous"} <br />
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                      <p className="text-gray-800">{comment.content}</p>
                    </div>
                    {(currentUser._id === comment.userId?._id ||
                      currentUser._id === thread.userId) && (
                      <button
                        title="Delete"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <Delete />
                      </button>
                    )}
                  </div>
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
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
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
  );
}

export default ThreadCard;
