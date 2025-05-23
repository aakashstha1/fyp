import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

export const requestInstructorRole = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { citizenshipFront, citizenshipBack, resume, educationPdf } =
      req.files || {};

    if (!citizenshipFront || !citizenshipBack || !resume || !educationPdf) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "instructor") {
      return res.status(400).json({ message: "You are already an instructor" });
    }

    user.documents = {
      citizenshipFront: citizenshipFront[0].path,
      citizenshipBack: citizenshipBack[0].path,
      resume: resume[0].path,
      educationPdf: educationPdf[0].path,
    };
    user.verificationStatus = "pending";

    await user.save();

    res.status(200).json({ message: "Instructor role request submitted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error requesting role", error: error.message });
  }
};
