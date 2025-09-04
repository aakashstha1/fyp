import express from "express";

// import {
//   getCourseProgress,
//   markAsComplete,
//   markAsInComplete,
//   updateLectureProgress,
// } from "../controllers/courseProgress.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getCourseProgress,
  getCourseProgressPercentage,
  markAssignmentComplete,
  markLectureComplete,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

// router.route("/:courseId").get(verifyToken, getCourseProgress);
// router
//   .route("/:courseId/lecture/:lectureId/view")
//   .post(verifyToken, updateLectureProgress);
// router.route("/:courseId/complete").post(verifyToken, markAsComplete);
// router.route("/:courseId/incomplete").post(verifyToken, markAsInComplete);

router.post("/complete", verifyToken, markLectureComplete);
router.post("/complete-assignment", verifyToken, markAssignmentComplete);
router.get("/:courseId", verifyToken, getCourseProgress);
router.get("/:courseId/percentage", verifyToken, getCourseProgressPercentage);

export default router;
