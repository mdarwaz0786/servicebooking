import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { getAdminDashboard } from "../../controllers/admin/dashboard.controller.js";

const router = express.Router();

router.get("/", getAdminDashboard);

export default router;
