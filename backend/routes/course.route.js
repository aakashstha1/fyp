import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  createCourse,
  getCourseById,
  getCourseByUserId,
  getPublishedCourse,
  getPublishedCourseById,
  togglePublishCourse,
  updateCourse,
} from "../controllers/courseController.js";
import {
  createLecture,
  editLecture,
  getCourseLectures,
  getLectureById,
  removeLecture,
  uploadVideo,
} from "../controllers/lecture.controller.js";

import upload from "../utils/multer.js";
const router = express.Router();

router.route("/create").post(verifyToken, createCourse);
router.route("/courses").get(verifyToken, getPublishedCourse);
router.route("/published-course/:courseId").get(getPublishedCourseById);

router.route("/my-courses").get(verifyToken, getCourseByUserId);
router.route("/detail/:courseId").get(verifyToken, getCourseById);
router
  .route("/update/:courseId")
  .put(verifyToken, upload.single("thumbnail"), updateCourse);
router.route("/:courseId").patch(verifyToken, togglePublishCourse);

//Lecture
router.route("/:courseId/lecture/create").post(verifyToken, createLecture);
router.route("/:courseId/lecture/:lectureId").put(verifyToken, editLecture);
router
  .route("/:courseId/lecture/upload-video")
  .post(verifyToken, upload.single("file"), uploadVideo);
router.route("/:courseId/lectures").get(verifyToken, getCourseLectures);
router.route("/lecture/:lectureId/").get(verifyToken, getLectureById);

router
  .route("/:courseId/lecture/:lectureId")
  .delete(verifyToken, removeLecture);

export default router;
