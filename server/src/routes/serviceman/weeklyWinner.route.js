import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { weeklyWinner } from "../../controllers/serviceman/weeklywinner.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, weeklyWinner);

export default router;
