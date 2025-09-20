import express from "express";
import {
  createServiceManBooking,
  getServiceManBookingById,
  getServiceManBookings,
} from "../../controllers/admin/servicemanBooking.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createServiceManBooking);
router.get("/", isLoggedIn, getServiceManBookings);
router.get("/:id", isLoggedIn, getServiceManBookingById);

export default router;
