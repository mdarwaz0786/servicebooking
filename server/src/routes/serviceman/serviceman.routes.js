import express from "express";
import authRoutes from "./auth.routes.js";
import kycRoutes from "./kyc.routes.js";
import profileRoutes from "./servicemanProfile.routes.js";
import trainingScheduleRoutes from "./trainingSchedule.routes.js";
import earningRoutes from "./earning.routes.js";
import bookingRoutes from "./servicemanBooking.routes.js";
import servicemanBookingUploadsRoutes from "./servicemanBookingUploads.routes.js";
import reviewRoutes from "./review.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/kyc", kycRoutes);
router.use("/profile", profileRoutes);
router.use("/training-schedule", trainingScheduleRoutes);
router.use("/earning", earningRoutes);
router.use("/booking", bookingRoutes);
router.use("/bookingUpload", servicemanBookingUploadsRoutes);
router.use("/review", reviewRoutes);

export default router;