import Draw from "../models/draw.model.js";
import User from "../models/user.model.js";

export const drawController = async (req, res) => {
  try {
    const { file, userId } = req.body;

    if (!file || !userId) {
      return res.status(400).json({
        message: "Missing file or userId",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Save draw data
    const newDraw = new Draw({
      file,
      user: user._id, // assuming 'user' is a reference field in Draw model
    });

    await newDraw.save();

    return res.status(201).json({
      message: "Drawing saved successfully",
      draw: newDraw,
    });
  } catch (error) {
    console.error("Error saving drawing:", error);
    return res.status(500).json({
      message: "Server error while saving drawing",
    });
  }
};
