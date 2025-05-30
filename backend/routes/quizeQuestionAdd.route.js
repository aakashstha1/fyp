import { questionAdd } from "../controllers/quizeController/quize.controller.js";
import express from "express";
const router = express.Router();

router.route("/add").post(questionAdd);

export default router;
