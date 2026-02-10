import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  getProviderBookings,
  updateBooking
} from "../../controllers/admin/booking.controller.js";

const router = express.Router();

// Routes
router.post("/create-booking", isLoggedIn, createBooking);
router.get("/serviceman-booking", isLoggedIn, getProviderBookings);
router.get("/", isLoggedIn, getBookings);
router.get("/:id", isLoggedIn, getBookingById);
router.patch("/update-booking/:id", isLoggedIn, updateBooking);
router.delete("/delete-booking/:id", isLoggedIn, deleteBooking);

export default router;
