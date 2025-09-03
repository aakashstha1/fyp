import express from "express";
import {
  getUser,
  requestInstructorRole,
  updateProfile,
  updateUserNiches,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import upload from "../utils/multer.js";
import { submitFeedback } from "../controllers/feedbackController.js";

const router = express.Router();
router.route("/profile").get(verifyToken, getUser);
router
  .route("/profile/update")
  .put(verifyToken, upload.single("image"), updateProfile);

router.post(
  "/request-instructor",
  verifyToken,
  upload.fields([
    { name: "citizenshipFront", maxCount: 1 },
    { name: "citizenshipBack", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "educationPdf", maxCount: 1 },
  ]),
  requestInstructorRole
);
<<<<<<< HEAD
router.post("/feedback", submitFeedback);
=======
router.route("/niches/:id").post(updateUserNiches);
>>>>>>> af392c9df4be13483cfd3b78267a6a39416389ea

export default router;
