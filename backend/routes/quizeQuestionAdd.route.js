import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import upload from "../utils/multer.js"; // reuse your existing multer setup
import {
  getLeaderboard,
  questionAdd,
  submitQuiz,
  viewQuize,
} from "../controllers/quizeController/quize.controller.js";

const router = express.Router();

// -------------------- Quiz Routes --------------------

// Admin: Add quiz (with CSV file)
router.route("/add").post(verifyToken, upload.single("file"), questionAdd);

// Authenticated users: View quizzes
router.route("/view").post(verifyToken, viewQuize);

// Authenticated users: Submit quiz answers
router.route("/submit").post(verifyToken, submitQuiz);

// Public: Leaderboard
router.route("/leaderboard").get(getLeaderboard);

export default router;
