import express from "express";
import bookingRoutes from "./booking.routes.js";
import addressRoutes from "./address.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/booking", bookingRoutes);
router.use("/address", addressRoutes);
router.use("/auth", authRoutes);

export default router;