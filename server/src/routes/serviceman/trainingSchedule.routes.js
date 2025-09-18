import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import {
  getNextTrainingSchedule,
} from "../../controllers/serviceman/trainingSchedule.controller.js";

const router = express.Router();

router.get("/next/upcoming", isLoggedIn, getNextTrainingSchedule);

export default router;
