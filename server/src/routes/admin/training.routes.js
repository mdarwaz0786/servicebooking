import express from "express";
import {
  createTraining,
  getTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining
} from "../../controllers/admin/training.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createTraining);
router.get("/", isLoggedIn, getTrainings);
router.get("/:id", isLoggedIn, getTrainingById);
router.patch("/:id", isLoggedIn, updateTraining);
router.delete("/:id", isLoggedIn, deleteTraining);

export default router;
