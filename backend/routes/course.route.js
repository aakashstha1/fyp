import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  createCourse,
  getCourseById,
  getCourseByUserId,
  updateCourse,
} from "../controllers/courseController.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/create").post(verifyToken, createCourse);
router.route("/my-courses").get(verifyToken, getCourseByUserId);
router.route("/detail/:courseId").get(verifyToken, getCourseById);
router
  .route("/update/:courseId")
  .put(verifyToken, upload.single("thumbnail"), updateCourse);

export default router;
