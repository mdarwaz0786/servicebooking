import express from "express";
import {
  getServiceManBookingById,
  getServiceManBookings,
  serviceManBookingOtp,
  serviceManBookingVerifyOtp,
  serviceManBookingAccept,
  serviceManBookingStartOtp,
  serviceManBookingStartVerifyOtp,
  servicemanBookingComplete,
  servicemanBookingHold,
  servicemanBookingHoldRelease
} from "../../controllers/serviceman/servicemanBooking.controller.js";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getServiceManBookings);
router.get("/:id", isLoggedIn, getServiceManBookingById);
router.post("/booking-otp/:id", isLoggedIn, serviceManBookingOtp);
router.post("/booking-otp-verify/:id", isLoggedIn, serviceManBookingVerifyOtp);
router.post("/accept/:id", isLoggedIn, serviceManBookingAccept);
router.post("/booking-start-otp/:id", isLoggedIn, serviceManBookingStartOtp);
// router.post("/complete/:id", isLoggedIn, serviceManBookingComplete);
router.post(
  "/booking-start-otp-verify/:id",
  isLoggedIn, upload.fields([{ name: "selfie", maxCount: 1 }]),
  serviceManBookingStartVerifyOtp,
);

router.post("/complete", isLoggedIn, servicemanBookingComplete);
router.post("/hold", isLoggedIn, servicemanBookingHold);
router.post("/hold-relase", isLoggedIn, servicemanBookingHoldRelease);

export default router;
