import express from "express";
import {
  submitFeedback,
  getAllFeedbacks,
  deleteFeedback,
  markFeedbackReviewed,
} from "../controllers/feedbackController.js";

const router = express.Router();

// User submits feedback
router.post("/", submitFeedback);

// Admin gets all feedbacks
router.get("/", getAllFeedbacks);

// Admin deletes feedback
router.delete("/:id", deleteFeedback);

// Admin marks as reviewed
router.put("/review/:id", markFeedbackReviewed);

export default router;
