import express from "express";
import {
  approveInstructorRequest,
  getAllInstructorRequests,
} from "../controllers/admin.controller.js";
import { requireAdmin, verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/instructor-requests")
  .get(verifyToken, requireAdmin, getAllInstructorRequests);

router
  .route("/instructor-requests/approve/:userId")
  .post(verifyToken, requireAdmin, approveInstructorRequest);

export default router;
