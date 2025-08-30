import Request from "../models/request.model.js";
// import User from "../models/user.model.js";

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("user", "name email role isVerified")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructor requests",
      error: error.message,
    });
  }
};

export const getReqById = async (req, res) => {
  try {
    const { reqId } = req.params;
    const request = await Request.findById(reqId).populate("user", "role");
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ request });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch request!", error: error.message });
  }
};

export const approveInstructorRequest = async (req, res) => {
  try {
    const { reqId } = req.params;
    const request = await Request.findById(reqId).populate("user");
    console.log(request);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    const user = request.user;
    user.role = "instructor";
    user.isVerified = true;

    request.status = "approved";

    await user.save();
    await request.save();

    res.status(200).json({ message: "Request approved", user });
  } catch (error) {
    res.status(500).json({ message: "Approval failed", error: error.message });
  }
};

export const rejectInstructorRequest = async (req, res) => {
  try {
    const { reqId } = req.params;
    const request = await Request.findById(reqId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    // Delete uploaded documents from Cloudinary
    const documentUrls = Object.values(request.documents || {});
    for (const url of documentUrls) {
      await deleteCloudinaryFile(url);
    }

    // Set rejection info + auto-delete after 4 days
    request.documents = {};
    request.status = "rejected";
    request.rejectionDate = new Date();
    request.expiresAt = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000); // +4 days

    await request.save();

    res.status(200).json({
      message: "Request rejected. It will be deleted automatically in 4 days.",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Rejection failed",
      error: error.message,
    });
  }
};

export const getAllInstructorRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("user", "name email role profile")
      .sort({ createdAt: -1 });

    res.status(200).json({ requests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch requests", error: error.message });
  }
};

export const demoteInstructor = async (req, res) => {
  try {
    const { reqId } = req.params;

    // find request + populate user
    const request = await Request.findById(reqId).populate("user");
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const user = request.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only allow demotion if user is actually an instructor
    if (user.role !== "instructor") {
      return res.status(400).json({ message: "User is not an instructor" });
    }

    // Demote user
    user.role = "enrollee";
    await user.save();

    // Delete uploaded documents from Cloudinary
    const documentUrls = Object.values(request.documents || {});
    for (const url of documentUrls) {
      await deleteCloudinaryFile(url);
    }

    // Remove the request completely
    await Request.findByIdAndDelete(reqId);

    res.status(200).json({
      message:
        "Instructor successfully demoted, request removed, and documents deleted",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Demotion failed",
      error: error.message,
    });
  }
};
