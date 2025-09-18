import express from "express";
import authRoutes from "./auth.routes.js";
import kycRoutes from "./kyc.routes.js";
import profileRoutes from "./servicemanProfile.routes.js";
import trainingScheduleRoutes from "./trainingSchedule.routes.js";
import earningRoutes from "./earning.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/kyc", kycRoutes);
router.use("/profile", profileRoutes);
router.use("/training-schedule", trainingScheduleRoutes);
router.use("/earning", earningRoutes);

export default router;