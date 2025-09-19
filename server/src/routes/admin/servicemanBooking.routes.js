import express from "express";
import {
  createServiceManBooking,
  deleteServiceManBooking,
  getServiceManBookingById,
  getServiceManBookings,
  updateServiceManBooking
} from "../../controllers/admin/servicemanBooking.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createServiceManBooking);
router.get("/", isLoggedIn, getServiceManBookings);
router.get("/:id", isLoggedIn, getServiceManBookingById);
router.patch("/:id", isLoggedIn, updateServiceManBooking);
router.delete("/:id", isLoggedIn, deleteServiceManBooking);

export default router;
