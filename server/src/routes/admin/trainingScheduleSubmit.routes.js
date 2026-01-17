import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { deleteTrainingScheduleSubmit, getTrainingScheduleSubmitById, getTrainingScheduleSubmits, rescheduleTraining, updateTrainingScheduleSubmit } from "../../controllers/admin/trainingScheduleSubmit.controller.js";

const router = express.Router();

router.post("/reschedule", isLoggedIn, rescheduleTraining);
router.get("/", isLoggedIn, getTrainingScheduleSubmits);
router.get("/:id", isLoggedIn, getTrainingScheduleSubmitById);
router.patch("/:id", isLoggedIn, updateTrainingScheduleSubmit);
router.delete("/:id", isLoggedIn, deleteTrainingScheduleSubmit);

export default router;
