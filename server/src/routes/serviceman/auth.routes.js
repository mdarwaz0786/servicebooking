import express from "express";
import { loginUser, verifyOtp, loggedInUser } from "../../controllers/serviceman/auth.controller.js";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.get("/loggedIn", isLoggedIn, loggedInUser);

export default router;
