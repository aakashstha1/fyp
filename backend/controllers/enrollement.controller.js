import PurchasedCourse from "../models/purchasedCourse.model.js";


// Get all courses the current user is enrolled in
export const getMyEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find purchased courses where status is completed
    const purchasedCourses = await PurchasedCourse.find({
      enrollee: userId,
      status: "completed",
    })
      .populate({
        path: "course",
        populate: { path: "creator", select: "name imageUrl" },
      })
      .exec();

    // Extract just the courses from purchased courses
    const enrolledCourses = purchasedCourses.map((pc) => pc.course);

    res.json({
      success: true,
      enrolledCourses,
    });
  } catch (error) {
    console.error("Error in getMyEnrolledCourses:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
