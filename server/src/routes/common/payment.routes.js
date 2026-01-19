import express from "express";
import { createRazorpayBookingOrder, razorpayWebhook, verifyQrPaymentWithoutWebhook, verifyRazorpayBookingPayment } from "../../controllers/common/payment.controller.js";

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

// verify payment without webhook
router.post(
  "/verify-payment-qr",
  express.raw({ type: "application/json" }),
  verifyQrPaymentWithoutWebhook,
);

// verify payment by webhook
router.post(
  "/verify-payment-by-webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook,
);

export default router;
