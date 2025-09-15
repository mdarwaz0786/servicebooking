import express from "express";
import { createRazorpayBookingOrder, verifyRazorpayBookingPayment } from "../../controllers/common/payment.controller.js";

const router = express.Router();

// Step 1: Create Razorpay Order (with cart & amount info)
router.post(
  "/create-order",
  createRazorpayBookingOrder
);

// Step 2: Verify Payment & Create Booking
router.post(
  "/verify-payment",
  verifyRazorpayBookingPayment
);

export default router;
