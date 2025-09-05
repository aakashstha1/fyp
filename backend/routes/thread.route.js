import express from "express";
import {
  addComment,
  createThread,
  deleteComment,
  deleteThread,
  getComment,
  getFilteredThreads,
  toggleLike,
  updateComment,
  updateThread,
} from "../controllers/threadController/thread.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express();

router.route("/create").post(verifyToken, createThread);

router.route("/getFilteredThreads").get(verifyToken, getFilteredThreads);

router.route("/deleteThread/:threadId").delete(verifyToken, deleteThread);
router.route("/updateThread/:threadId").put(verifyToken, updateThread);
router.route("/toggleLike/:threadId").post(verifyToken, toggleLike);
// ----------Comments--------------------------------------------------------
router.route("/addComment/:threadId").post(verifyToken, addComment);
router.route("/getComment/:threadId").get(verifyToken, getComment);
router.route("/deleteComment/:commentId").delete(verifyToken, deleteComment);
router.route("/updateComment/:commentId").put(verifyToken, updateComment);
export default router;
