import User from "../models/user.model.js";
export const requestInstructorRole = async (req, res) => {
  try {
    const userId = req.user.userId; // From JWT middleware

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "instructor") {
      return res.status(400).json({ message: "You are already an instructor" });
    }

    user.verificationStatus = "pending";
    await user.save();

    res.status(200).json({ message: "Instructor role request submitted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error requesting role", error: error.message });
  }
};
