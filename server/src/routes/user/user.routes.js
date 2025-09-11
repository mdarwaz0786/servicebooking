import express from "express";
import bookingRoutes from "./booking.routes.js";

const router = express.Router();

router.use("/booking", bookingRoutes);

export default router;