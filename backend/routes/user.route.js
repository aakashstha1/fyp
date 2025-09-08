import express from "express";
import {
  checkProfileCompletion,
  getUser,
  requestInstructorRole,
  updateProfile,
  updateUserNiches,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import upload from "../utils/multer.js";

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
router.route("/niches/:id").post(updateUserNiches);
router.route("/profile-completion").get(verifyToken, checkProfileCompletion);

export default router;
