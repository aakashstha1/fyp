import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { Button } from "@/components/ui/button";
function ThreadCard({ thread, onComment }) {
  const [commentText, setCommentText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onComment(thread.id, commentText);
    setCommentText("");
  };

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      <h3 className="font-semibold text-lg">{thread.title}</h3>
      <p className="text-sm text-gray-700 mt-1">{thread.content}</p>
      <span className="text-xs text-gray-500 block mt-2">
        by {thread.author} on {new Date(thread.createdAt).toLocaleString()}
      </span>

      <div className="mt-4 border-t pt-3">
        <h4 className="text-sm font-semibold mb-2">Comments</h4>
        {thread.comments.length > 0 ? (
          <ul className="space-y-2">
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
      </div>
    </div>
  );
}

export default ThreadCard;
