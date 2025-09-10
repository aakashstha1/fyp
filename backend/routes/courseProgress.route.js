import express from "express";


import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getCourseProgress,
  getCourseProgressPercentage,
  markAssignmentComplete,
  markLectureComplete,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

router.post("/complete", verifyToken, markLectureComplete);
router.post("/complete-assignment", verifyToken, markAssignmentComplete);
router.get("/:courseId", verifyToken, getCourseProgress);
router.get("/:courseId/percentage", verifyToken, getCourseProgressPercentage);

export default router;
