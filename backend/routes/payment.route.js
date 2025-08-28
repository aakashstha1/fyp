import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  completePayment,
  initializePayment,
} from "../controllers/Payment.controller.js";

const router = express.Router();

router.route("/initialize-payment").post(verifyToken, initializePayment);
router.route("/complete-payment").get(completePayment);

export default router;
