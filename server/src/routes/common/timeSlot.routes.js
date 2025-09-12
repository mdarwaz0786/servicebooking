import express from "express";
import {
  getAvailableSlots,
  getSingleTimeSlot,
} from "../../controllers/common/timeSlot.controller.js";

const router = express.Router();

router.get("/available/by-date", getAvailableSlots);
router.get("/:id", getSingleTimeSlot);

export default router;
