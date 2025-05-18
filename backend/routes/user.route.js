import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { requestInstructorRole } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/request-instructor", verifyToken, requestInstructorRole);

export default router;
