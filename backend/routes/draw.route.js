import express from "express";
import { drawController } from "../controllers/draw.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import upload from "../utils/multer.js";
const router = express.Router();

router
  .route("/create")
  .post(verifyToken, upload.single("file"), drawController);
export default router;
