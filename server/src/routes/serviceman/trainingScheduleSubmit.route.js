import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { createTrainingScheduleSubmit, getTrainingScheduleSubmitById, getTrainingScheduleSubmits } from "../../controllers/serviceman/trainingScheduleSubmit.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createTrainingScheduleSubmit);
router.get("/", isLoggedIn, getTrainingScheduleSubmits);
router.get("/:id", isLoggedIn, getTrainingScheduleSubmitById);

export default router;
