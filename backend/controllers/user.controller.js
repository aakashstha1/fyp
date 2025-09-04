import User from "../models/user.model.js";
import Request from "../models/request.model.js";
import { uploadMedia } from "../utils/cloudinary.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const request = await Request.findOne({ user: userId });
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, req: request || null });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

//Update Profile
export const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { name, bio, phone, gender } = req.body;
  const imageFile = req.file;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (imageFile) {
      const uploadResponse = await uploadMedia(imageFile.path);
      user.imageUrl = uploadResponse.secure_url;
    }

    user.name = name || user.name;
    user.gender = gender || user.gender;
    user.bio = bio || user.bio;
    user.phone = phone || user.phone;

    await user.save();
    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.log("Profile update error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update profile" });
  }
};

//Request for Instructor
export const requestInstructorRole = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { citizenshipFront, citizenshipBack, resume, educationPdf } =
      req.files || {};

    if (!citizenshipFront || !citizenshipBack || !resume || !educationPdf) {
      return res.status(400).json({ message: "All documents are required!" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "instructor") {
      return res.status(400).json({ message: "You are already an instructor" });
    }

    const existingRequest = await Request.findOne({ user: userId }).sort({
      createdAt: -1,
    });

    if (existingRequest) {
      if (existingRequest.status === "pending") {
        return res
          .status(400)
          .json({ message: "You already have a pending request" });
      }

      if (existingRequest.status === "rejected") {
        const timeSinceRejection =
          Date.now() - new Date(existingRequest.rejectionDate).getTime();
        const aDay = 24 * 60 * 60 * 1000;

        if (timeSinceRejection < aDay) {
          return res
            .status(400)
            .json({ message: "Please wait 24 hours before reapplying" });
        }
      }
    }

    const frontImage = await uploadMedia(citizenshipFront[0].path);
    const backImage = await uploadMedia(citizenshipBack[0].path);
    const resumePdf = await uploadMedia(resume[0].path);
    const qualificationsPdf = await uploadMedia(educationPdf[0].path);

    const newRequest = new Request({
      user: userId,
      verificationStatus: "pending",
      documents: {
        frontImage: frontImage.secure_url,
        backImage: backImage.secure_url,
        resumePdf: resumePdf.secure_url,
        qualificationsPdf: qualificationsPdf.secure_url,
      },
    });

    await newRequest.save();

    res
      .status(200)
      .json({ message: "Instructor request submitted successfully" });
  } catch (error) {
    console.error("Request error:", error);
    res
      .status(500)
      .json({ message: "Error submitting request", error: error.message });
  }
};

//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    // check role
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }

    // fetch all users
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//  Update User Niches (Learning Preferences)
export const updateUserNiches = async (req, res) => {
  try {
    const { id } = req.params; // userId from URL
    const { niches } = req.body; // should be an array

    if (!niches || !Array.isArray(niches) || niches.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please select at least one niche" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { niches },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Niches updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating niches:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
