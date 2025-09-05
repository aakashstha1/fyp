// import { CourseProgress } from "../models/courseProgress.model.js";
// import Course from "../models/course.model.js";
// export const getCourseProgress = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.user.userId;

//     //Step-1 : Fetch the user course progress
//     let courseProgress = await CourseProgress.findOne({
//       courseId,
//       userId,
//     }).populate("courseId");

//     const courseDetail = await Course.findById(courseId).populate("lectures");

//     if (!courseDetail) {
//       return res.status(404).json({
//         message: "Course not found!",
//       });
//     }

//     //Step-2 : If no progress, return course details and empty progress
//     if (!courseProgress) {
//       return res.status(200).json({
//         data: {
//           courseDetail,
//           progress: [],
//           completed: false,
//         },
//       });
//     }

//     //Step-3 : Return user's course progress along with course detail
//     return res.status(200).json({
//       data: {
//         courseDetail,
//         progress: courseProgress.lectureProgress,
//         completed: courseProgress.completed,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Update lecture progress
// export const updateLectureProgress = async (req, res) => {
//   try {
//     const { courseId, lectureId } = req.params;
//     const userId = req.id;

//     //Fetch or create course progress
//     let courseProgress = await CourseProgress.findOne({
//       courseId,
//       userId,
//     });

//     if (!courseProgress) {
//       //If no progress exist
//       courseProgress = new CourseProgress({
//         userId,
//         courseId,
//         completed: false,
//         lectureProgress: [],
//       });
//     }

//     //Find the lectureProgress in the course Progress
//     const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) =>
//       lecture.lectureId.equals(lectureId)
//     );
//     if (lectureIndex !== -1) {
//       courseProgress.lectureProgress[lectureIndex].viewed = true;
//     } else {
//       //Add new lecture progress
//       courseProgress.lectureProgress.push({
//         lectureId,
//         viewed: true,
//       });
//     }
//     // if all lecture is complete
//     const lectureProgressLength = courseProgress.lectureProgress.filter(
//       (lectureProg) => lectureProg.viewed
//     ).length;

//     const course = await Course.findById(courseId);
//     if (course.lectures.length === lectureProgressLength) {
//       courseProgress.completed = true;
//     }
//     await courseProgress.save();

//     return res.status(200).json({
//       message: "Lecture progress updated successfully!",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Mark course as Completed
// export const markAsComplete = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;
//     let courseProgress = await CourseProgress.findOne({
//       courseId,
//       userId,
//     });
//     if (!courseProgress) {
//       return res.status(404).json({
//         message: "Course progress not found",
//       });
//     }

//     courseProgress.lectureProgress.map(
//       (lectureProgress) => (lectureProgress.viewed = true)
//     );
//     courseProgress.completed = true;

//     await courseProgress.save();

//     return res.status(200).json({
//       message: "Course marked as completed.",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

import Progress from "../models/courseProgress.model.js";
import Course from "../models/course.model.js";

export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const userId = req.user.userId; // assuming JWT auth middleware sets req.user

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({ userId, courseId, completedLectures: [] });
    }

    if (!progress.completedLectures.includes(lectureId)) {
      progress.completedLectures.push(lectureId);
      await progress.save();
    }

    res.status(200).json({ message: "Lecture marked as complete", progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;

    const progress = await Progress.findOne({ userId, courseId }).populate(
      "completedLectures completedAssignment"
    );

    res.status(200).json({
      completedLectures: progress?.completedLectures || [],
      completedAssignment: progress?.completedAssignment?._id || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseProgressPercentage = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;

    const course = await Course.findById(courseId).populate("lectures");
    const totalLectures = course.lectures.length;

    const progress = await Progress.findOne({ userId, courseId });

    const completed = progress ? progress.completedLectures.length : 0;
    const percentage =
      totalLectures > 0 ? (completed / totalLectures) * 100 : 0;

    res.status(200).json({ completed, totalLectures, percentage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAssignmentComplete = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.body;
    const userId = req.user.userId;

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({ userId, courseId });
    }

    // Only mark if not already completed
    if (
      !progress.completedAssignment ||
      progress.completedAssignment.toString() !== assignmentId
    ) {
      progress.completedAssignment = assignmentId;
      await progress.save();
    }

    res
      .status(200)
      .json({ message: "Assignment marked as complete", progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
