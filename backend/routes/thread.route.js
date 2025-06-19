import express from "express";
import {
  addComment,
  deleteComment,
  getAllThreads,
  getComment,
  ThreadPost,
} from "../controllers/threadController/thread.controller.js";
const router = express();

router.route("/create").post(ThreadPost);
router.route("/all/threads").get(getAllThreads);
router.route("/addComment").post(addComment);
router.route("/getComment/:threadId").get(getComment);
router.route("/deleteComment/").delete(deleteComment);
export default router;
