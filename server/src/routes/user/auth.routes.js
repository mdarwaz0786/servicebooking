import express from "express";
import { loginUser, verifyOtp, loggedInUser, updateProfile } from "../../controllers/user/auth.controller.js";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.get("/loggedIn", isLoggedIn, loggedInUser);

router.post(
  "/update-profile",
  isLoggedIn,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
  ]),
  validateFileSize,
  updateProfile
);

export default router;
