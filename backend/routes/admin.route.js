import express from "express";

import { requireAdmin, verifyToken } from "../middleware/auth.middleware.js";
import {
  approveInstructorRequest,
  getAllRequests,
  getReqById,
  rejectInstructorRequest,
} from "../controllers/request.controller.js";

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

export default router;
