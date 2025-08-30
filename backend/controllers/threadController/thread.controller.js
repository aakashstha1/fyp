import Thread from "../../models/threadModel/thread.model.js";
import User from "../../models/user.model.js";
import Comment from "../../models/threadModel/comment.model.js";
export const ThreadPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!userId || !title || !content) {
      return res.status(400).json({
        message:
          "All fields are required. Please check login, title, and content.",
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        message: "User not found. Please login first.",
      });
    }

    const payload = new Thread({
      title,
      content,
      userId,
    });

    await payload.save();

    return res.status(201).json({
      thread: payload._id,
      message: "Successfully posted.",
    });
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

export const getAllThreads = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(401).json({ message: " please login first" });
    }

    const existed = await User.findById(userId);
    if (!existed) {
      return res.status(402).json({ message: "UnAuthorized login detected" });
    }
    const threads = await Thread.find().populate("userId", "name").sort({
      createdAt: -1,
    });
    res.status(201).json({
      threads,
    });
  } catch (error) {
    console.log(error + "getAllthreads Error");
    return res.status(500).json({
      message: "server side error to get all threads",
    });
  }
};

export const deleteThread = async (req, res) => {
  try {
    const { thread_id } = req.params;
    const userId = req.user.userId;
    if (!thread_id || !userId) {
      return res.status(400).json({
        message: "Please login or provide a valid thread ID",
      });
    }
    const searchThread = await Thread.findById(thread_id);
    if (!searchThread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    if (searchThread.userId.toString() != userId) {
      return res.status(403).json({ message: "unAuthorized to delete" });
    }
    await searchThread.deleteOne();
    return res.status(200).json({ message: "Thread deleted  successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { threadId, content, userId } = req.body;
    if (!threadId || !userId || !content) {
      return res.status(400).json({
        message: "Something is missing",
      });
    }

    const existed = await User.findById(userId);
    if (!existed) {
      return res.status(401).json({
        message: "UnAuthorized Access!",
      });
    }

    const existThread = await Thread.findById(threadId);

    const newComment = new Comment({
      content,
      userId,
      threadId,
    });
    await newComment.save();
    await newComment.populate("userId", "name");

    existThread.comments.push(newComment._id);
    await existThread.save();

    return res.status(201).json({
      message: "comment added Successfuly",
      comment: newComment,
    });
  } catch (error) {
    console.error("comment Error", error);
    return res
      .status(500)
      .json({ message: "Server error while adding comment" });
  }
};

export const getComment = async (req, res) => {
  try {
    const { threadId } = req.params;

    if (!threadId) {
      return res.status(400).json({ message: "Thread ID is required" });
    }

    const comments = await Comment.find({ threadId })
      .populate("userId", "name") // populate user's name
      .sort({ createdAt: -1 });

    if (!comments.length) {
      return res
        .status(404)
        .json({ message: "No comments found for this thread" });
    }

    return res.status(200).json({ comments });
  } catch (error) {
    console.error("getComment Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching comments" });
  }
};
// Delete
export const deleteComment = async (req, res) => {
  try {
    const { commentId, userId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const thread = await Thread.findById(comment.threadId);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Check if current user is either the comment owner or thread owner
    if (
      comment.userId.toString() !== userId &&
      thread.userId.toString() !== userId
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(commentId);
    thread.comments = thread.comments.filter(
      (cId) => cId.toString() !== commentId
    );
    await thread.save();
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
