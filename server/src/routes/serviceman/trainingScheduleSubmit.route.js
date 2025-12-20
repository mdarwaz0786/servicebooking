import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { createTrainingScheduleSubmit, getTrainingScheduleSubmitById, } from "../../controllers/serviceman/trainingScheduleSubmit.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createTrainingScheduleSubmit);
router.get("/detail", isLoggedIn, getTrainingScheduleSubmitById);

export default router;
