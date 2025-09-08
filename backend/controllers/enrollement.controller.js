import PurchasedCourse from "../models/purchasedCourse.model.js";
// import Course from "../models/course.model.js";

// export const getEnrolled = async (req, res) => {
//   try {
//     const { courseId, totalPrice } = req.body;
//     const userId = req.user.userId;

//     // find course
//     const course = await Course.findOne({
//       _id: courseId,
//       price: Number(totalPrice),
//     });

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found or price mismatch.",
//       });
//     }

//     // check if already purchased
//     const alreadyPurchased = await PurchasedCourse.findOne({
//       course: courseId,
//       enrollee: userId,
//     });

//     if (alreadyPurchased) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already enrolled for this course.",
//         purchasedCourseData: alreadyPurchased,
//       });
//     }

//     // create purchase and directly mark completed
//     const purchasedCourseData = await PurchasedCourse.create({
//       course: courseId,
//       enrollee: userId,
//       totalPrice,
//       paymentMethod: "esewa",
//       status: "completed", // ✅ no pending, directly completed
//     });

//     // add to enrolledStudents if not already
//     if (
//       !course.enrolledStudents.some((id) => id.toString() === userId.toString())
//     ) {
//       course.enrolledStudents.push(userId);
//       await course.save();
//     }

//     res.json({
//       success: true,
//       message: "Enrollment successful!",
//       purchasedCourseData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

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
