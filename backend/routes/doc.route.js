import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  createDoc,
  getDocById,
  getMyDocs,
  updateDoc,
} from "../controllers/doc.controller.js";

const router = express.Router();

router.route("/create").post(verifyToken, createDoc);
router.route("/my-docs").get(verifyToken, getMyDocs);
router.route("/:docId").get(verifyToken, getDocById);
router.route("/:docId").put(verifyToken, updateDoc);

export default router;
