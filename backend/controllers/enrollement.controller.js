import PurchasedCourse from "../models/purchasedCourse.model.js";
import Course from "../models/course.model.js";

export const getEnrolled = async (req, res) => {
  try {
    const { courseId, totalPrice } = req.body;
    const userId = req.user.userId;

    // find course
    const course = await Course.findOne({
      _id: courseId,
      price: Number(totalPrice),
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or price mismatch.",
      });
    }

    // check if already purchased
    const alreadyPurchased = await PurchasedCourse.findOne({
      course: courseId,
      enrollee: userId,
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        success: false,
        message: "You have already enrolled for this course.",
        purchasedCourseData: alreadyPurchased,
      });
    }

    // create purchase and directly mark completed
    const purchasedCourseData = await PurchasedCourse.create({
      course: courseId,
      enrollee: userId,
      totalPrice,
      paymentMethod: "esewa",
      status: "completed", // ✅ no pending, directly completed
    });

    // add to enrolledStudents if not already
    if (
      !course.enrolledStudents.some((id) => id.toString() === userId.toString())
    ) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    res.json({
      success: true,
      message: "Enrollment successful!",
      purchasedCourseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all courses the current user is enrolled in
export const getMyEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const enrolledCourses = await Course.find({
      enrolledStudents: userId,
    }).populate("creator", "name imageUrl");

    res.json({
      success: true,
      enrolledCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
