import {
  questionAdd,
  viewQuize,
} from "../controllers/quizeController/quize.controller.js";
import express from "express";
const router = express.Router();

router.route("/add").post(questionAdd);
router.route("/view").post(viewQuize);
export default router;
