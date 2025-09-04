import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourseByUserId,
  getCourseLectures,
  getPublishedCourse,
  getPublishedCourseById,
  getRecommendedCourses,
  getSearchedCourses,
  togglePublishCourse,
  updateCourse,
} from "../controllers/course.controller.js";
import {
  createLecture,
  editLecture,
  // getCourseLectures,
  getLectureById,
  removeLecture,
  uploadVideo,
} from "../controllers/lecture.controller.js";

import upload from "../utils/multer.js";
import {
  createAssignment,
  getCourseAssignment,
  removeAssignment,
  updateAssignment,
} from "../controllers/assignment.controller.js";
const router = express.Router();

router.route("/create").post(verifyToken, createCourse);
router.route("/courses").get(getPublishedCourse);
router.route("/recommendedCourses").get(verifyToken, getRecommendedCourses);

router.route("/filter-course").get(getSearchedCourses);

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

//Assignment
router
  .route("/:courseId/assignment/create")
  .post(verifyToken, upload.single("file"), createAssignment);

// Edit assignment
router
  .route("/:courseId/assignment/update")
  .put(verifyToken, upload.single("file"), updateAssignment);

// Remove assignment
router
  .route("/:courseId/assignment/remove")
  .delete(verifyToken, removeAssignment);

// Get assignment for course
router.route("/:courseId/assignment").get(verifyToken, getCourseAssignment);
router.route("/:courseId").delete(verifyToken, deleteCourse);

export default router;
