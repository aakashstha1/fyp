import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { createDoc, getMyDocs } from "../controllers/doc.controller.js";

const router = express.Router();

router.route("/create-doc").post(verifyToken, createDoc);
router.route("/my-docs").get(verifyToken, getMyDocs);
// router.route("/my-docs/:docId").put(verifyToken, updateDoc);

export default router;
