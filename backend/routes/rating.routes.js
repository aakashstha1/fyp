import express from "express";
import {
  getAverageRating,
  getCourseRatings,
  submitRating,
} from "../controllers/rating.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/submit").post(verifyToken, submitRating);
router.route("/:courseId").get( getCourseRatings);
router.route("/:courseId/average").get( getAverageRating);

export default router;
