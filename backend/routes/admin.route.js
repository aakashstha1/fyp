import express from "express";

import { requireAdmin, verifyToken } from "../middleware/auth.middleware.js";
import {
  approveInstructorRequest,
  getAllRequests,
  getReqById,
  rejectInstructorRequest,
} from "../controllers/request.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";
import { getAllCourses } from "../controllers/courseController.js";

const router = express.Router();

router
  .route("/instructor-requests")
  .get(verifyToken, requireAdmin, getAllRequests);
router
  .route("/instructor-request/:reqId")
  .get(verifyToken, requireAdmin, getReqById);
router
  .route("/approve/:reqId")
  .put(verifyToken, requireAdmin, approveInstructorRequest);
router
  .route("/reject/:reqId")
  .put(verifyToken, requireAdmin, rejectInstructorRequest);

router.route("/user-list").get(verifyToken, getAllUsers);
router.route("/course-list").get(verifyToken, getAllCourses);


export default router;
