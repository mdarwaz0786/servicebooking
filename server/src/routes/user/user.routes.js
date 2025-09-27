import express from "express";
import bookingRoutes from "./booking.routes.js";
import addressRoutes from "./address.routes.js";
import authRoutes from "./auth.routes.js";
import reviewRoutes from "./review.routes.js";

const router = express.Router();

router.use("/booking", bookingRoutes);
router.use("/address", addressRoutes);
router.use("/auth", authRoutes);
router.use("/review", reviewRoutes);

export default router;