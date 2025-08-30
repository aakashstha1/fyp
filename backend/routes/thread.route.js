import express from "express";
import {
  addComment,
  deleteComment,
  deleteThread,
  getAllThreads,
  getComment,
  ThreadPost,
} from "../controllers/threadController/thread.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express();

router.route("/create").post(ThreadPost);
router.route("/all/threads").get(getAllThreads);
router.route("/deleteThread/:thread_id").delete(verifyToken, deleteThread);
router.route("/addComment").post(addComment);
router.route("/getComment/:threadId").get(getComment);
router.route("/deleteComment/").delete(deleteComment);
export default router;
