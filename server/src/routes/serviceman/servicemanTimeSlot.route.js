import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import {
  createServicemanTimeSlot,
  deleteServicemanTimeSlot,
  getServicemanTimeSlotById,
  getServicemanTimeSlots,
  updateServicemanTimeSlot
} from "../../controllers/serviceman/servicemanTimeSlot.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createServicemanTimeSlot);
router.get("/get-all", isLoggedIn, getServicemanTimeSlots);
router.get("/get-detail/:id", isLoggedIn, getServicemanTimeSlotById);
router.post("/update/:id", isLoggedIn, updateServicemanTimeSlot);
router.post("/delete/:id", isLoggedIn, deleteServicemanTimeSlot);

export default router;
