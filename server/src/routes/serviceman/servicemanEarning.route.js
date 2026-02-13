import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { getServicemanEarnings, getTotalEarnings } from "../../controllers/serviceman/servicemanEarning.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getTotalEarnings);

export default router;
