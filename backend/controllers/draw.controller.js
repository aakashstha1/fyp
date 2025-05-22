import Draw from "../models/draw.model.js";
import User from "../models/user.model.js";

export const drawController = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from auth middleware
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "File is required.",
      });
    }

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User ID not found.",
      });
    }

    // Ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Create and save draw
    const newDraw = new Draw({
      file: file.filename,
      user: user._id,
    });

    await newDraw.save();

    return res.status(201).json({
      message: "Drawing saved successfully.",
      data: newDraw,
    });
  } catch (error) {
    console.error("Error saving drawing:", error);
    return res.status(500).json({
      message: "Server error while saving drawing.",
    });
  }
};
