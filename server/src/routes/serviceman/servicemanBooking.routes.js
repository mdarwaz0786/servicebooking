import express from "express";
import {
  getServiceManBookingById,
  getServiceManBookings,
  serviceManBookingOtp,
  serviceManBookingVerifyOtp,
  serviceManBookingAccept,
  serviceManBookingStartOtp,
  serviceManBookingStartVerifyOtp
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
router.post("/booking-start-otp-verify/:id", isLoggedIn, upload.single("selfie"), serviceManBookingStartVerifyOtp);

export default router;
