import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { monthlyStats } from "../../controllers/serviceman/target.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, monthlyStats);

export default router;
