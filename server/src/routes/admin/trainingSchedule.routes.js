import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createTrainingSchedule,
  getAllTrainingSchedules,
  getTrainingScheduleById,
  updateTrainingSchedule,
  deleteTrainingSchedule,
  getNextTrainingSchedule,
} from "../../controllers/admin/trainingSchedule.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createTrainingSchedule);
router.get("/", getAllTrainingSchedules);
router.get("/:id", getTrainingScheduleById);
router.patch("/:id", isLoggedIn, updateTrainingSchedule);
router.delete("/:id", isLoggedIn, deleteTrainingSchedule);
router.get("/next/upcoming", getNextTrainingSchedule);

export default router;
