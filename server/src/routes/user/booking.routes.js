import express from "express";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking
} from "../../controllers/user/booking.controller.js";

const router = express.Router();

// Routes
router.post("/create-booking", isLoggedIn, createBooking);
router.get("/", isLoggedIn, getBookings);
router.get("/:id", isLoggedIn, getBookingById);
router.patch("/update-booking/:id", isLoggedIn, updateBooking);
router.delete("/delete-booking/:id", isLoggedIn, deleteBooking);

export default router;
