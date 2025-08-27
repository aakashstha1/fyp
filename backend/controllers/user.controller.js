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
      if (existingRequest.verificationStatus === "pending") {
        return res
          .status(400)
          .json({ message: "You already have a pending request" });
      }

      if (existingRequest.verificationStatus === "rejected") {
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

    const newRequest = new Request({
      user: userId,
      verificationStatus: "pending",
      documents: {
        frontImage: citizenshipFront[0].path,
        backImage: citizenshipBack[0].path,
        resumePdf: resume[0].path,
        qualificationsPdf: educationPdf[0].path,
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
