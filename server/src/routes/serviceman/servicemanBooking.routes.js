import express from "express";
import {
  getServiceManBookingById,
  getServiceManBookings,
  serviceManBookingOtp,
  serviceManBookingVerifyOtp
} from "../../controllers/serviceman/servicemanBooking.controller.js";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getServiceManBookings);
router.get("/:id", isLoggedIn, getServiceManBookingById);
router.post("/booking-otp/:id", isLoggedIn, serviceManBookingOtp);
router.post("/booking-otp-verify/:id", isLoggedIn, serviceManBookingVerifyOtp);

export default router;
