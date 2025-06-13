import Thread from "../../models/threadModel/thread.model.js";
import User from "../../models/user.model.js";

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
