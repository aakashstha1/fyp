import User from "../models/user.model.js";

export const getAllInstructorRequests = async (req, res) => {
  try {
    const requests = await User.find({
      verificationStatus: { $in: ["pending", "approved", "rejected"] },
    }).select("-password");

    res.status(200).json({
      success: true,
      total: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructor requests",
      error: error.message,
    });
  }
};

export const approveInstructorRequest = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verificationStatus === "none") {
      return res
        .status(400)
        .json({ message: "Userhas not send request for instructor role." });
    }
    if (user.verificationStatus === "approved") {
      return res
        .status(400)
        .json({ message: "User is already approved as instructor" });
    }
    user.role = "instructor";
    user.isVerified = true;
    user.verificationStatus = "approved";

    await user.save();

    res.status(200).json({ message: "Instructor request approved", user });
  } catch (error) {
    res.status(500).json({ message: "Approval failed", error: error.message });
  }
};
