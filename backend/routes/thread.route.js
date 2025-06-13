import express from "express";
import {
  getAllThreads,
  ThreadPost,
} from "../controllers/threadController/thread.controller.js";
const router = express();

router.route("/create").post(ThreadPost);
router.route("/all/threads").get(getAllThreads);
export default router;
