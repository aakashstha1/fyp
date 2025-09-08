import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  // getEnrolled,
  getMyEnrolledCourses,
} from "../controllers/enrollement.controller.js";

const router = express.Router();

// router.route("/").post(verifyToken, getEnrolled);
router.route("/enrolled-courses").get(verifyToken, getMyEnrolledCourses);

export default router;
