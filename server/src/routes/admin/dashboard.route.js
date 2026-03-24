import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { getAdminDashboard, getBookingStatusCount } from "../../controllers/admin/dashboard.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getAdminDashboard);
router.get("/status-count", isLoggedIn, getBookingStatusCount);

export default router;
