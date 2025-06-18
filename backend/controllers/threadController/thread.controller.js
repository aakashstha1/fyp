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
