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
      message: "Successfully posted.",
    });
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};
