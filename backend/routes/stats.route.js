import express from "express";

import { requireAdmin, verifyToken } from "../middleware/auth.middleware.js";
import {
  getAllIncome,
  getCreatorIncome,
} from "../controllers/stats.controller.js";

const router = express.Router();

router.route("/income").get(verifyToken, getCreatorIncome);
router.route("/all-income").get(verifyToken, requireAdmin, getAllIncome);

export default router;
