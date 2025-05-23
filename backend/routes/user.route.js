import express from "express";
import {
  getUser,
  requestInstructorRole,
} from "../controllers/user.controller.js";
import upload from "../utils/multer-cloudinary.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
router.route("/profile").get(verifyToken, getUser);
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

export default router;
