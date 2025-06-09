import {
  getLeaderboard,
  questionAdd,
  submitQuiz,
  viewQuize,
} from "../controllers/quizeController/quize.controller.js";
import express from "express";
const router = express.Router();

router.route("/add").post(questionAdd);
router.route("/view").post(viewQuize);
router.route("/submit").post(submitQuiz);
router.route("/leaderboard").get(getLeaderboard);
export default router;
