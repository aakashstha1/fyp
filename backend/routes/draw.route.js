import express from "express";
import { drawController } from "../controllers/draw.controller.js";
import upload from "../utils/multer-cloudinary.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/create").post(verifyToken,upload.single("file"), drawController);
export default router;
