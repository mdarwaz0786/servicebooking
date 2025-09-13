import express from "express";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";
import {
  createBooking,
  getBookings,
  getBookingById,
} from "../../controllers/user/booking.controller.js";

const router = express.Router();

// Routes
router.post("/create-booking", isLoggedIn, createBooking);
router.get("/", isLoggedIn, getBookings);
router.get("/:id", isLoggedIn, getBookingById);

export default router;
