import express from "express";
import { drawController } from "../controllers/draw.controller.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.post("/1", upload.single("file"), drawController);
export default router;
