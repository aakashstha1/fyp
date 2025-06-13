import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function ThreadCard({ thread, onComment, currentUser }) {
  const [commentText, setCommentText] = useState("");
  const [showCommentSection, setShowCommentSection] = useState(false);

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onComment(thread.id, commentText);
    setCommentText("");
  };

  const handleCommentClick = () => {
    setShowCommentSection((prev) => !prev);
  };

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      <h3 className="font-semibold text-lg">{thread.title}</h3>
      <p className="text-sm text-gray-700 mt-1">{thread.content}</p>
      <span className="text-xs text-gray-500 block mt-2">
        by {thread.author} on {new Date(thread.createdAt).toLocaleString()}
      </span>

      <div className="mt-4 border-t pt-3">
        <Button onClick={handleCommentClick}>
          {showCommentSection ? "Hide Comments" : "Comment"}
        </Button>

        {showCommentSection && (
          <>
            <h4 className="text-sm font-semibold mt-4 mb-2">Comments</h4>
            {thread.comments.length > 0 ? (
              <ul className="space-y-2 max-h-48 overflow-y-auto">
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
          </>
        )}
      </div>
    </div>
  );
}

export default ThreadCard;
