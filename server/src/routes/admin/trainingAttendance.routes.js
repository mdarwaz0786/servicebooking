import express from "express";
import {
  createTrainingAttendance,
  getTrainingAttendance,
  getTrainingAttendanceById,
  updateTrainingAttendance,
  deleteTrainingAttendance
} from "../../controllers/admin/trainingAttendance.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createTrainingAttendance);
router.get("/", isLoggedIn, getTrainingAttendance);
router.get("/:id", isLoggedIn, getTrainingAttendanceById);
router.patch("/:id", isLoggedIn, updateTrainingAttendance);
router.delete("/:id", isLoggedIn, deleteTrainingAttendance);

export default router;
