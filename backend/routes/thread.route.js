import express from "express";
import { ThreadPost } from "../controllers/threadController/thread.controller.js";
const router = express();

router.route("/create").post(ThreadPost);

export default router;
