import express from "express";
import {
  createTimeSlot,
  getAvailableSlots,
  getAllTimeSlots,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from "../../controllers/admin/timeSlot.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/create-time-slot", isLoggedIn, createTimeSlot);
router.get("/", isLoggedIn, getAllTimeSlots);
router.get("/:id", isLoggedIn, getSingleTimeSlot);
router.get("/available/by-date", getAvailableSlots);
router.patch("/update-time-slot/:id", isLoggedIn, updateTimeSlot);
router.delete("/delete-time-slot/:id", isLoggedIn, deleteTimeSlot);

export default router;
