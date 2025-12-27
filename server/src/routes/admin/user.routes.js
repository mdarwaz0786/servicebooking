import express from "express";
import {
  getAllUsers,
  getUserDetails,
  registerUser,
  updateUserStatus,
} from "../../controllers/admin/user.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/register", isLoggedIn, registerUser);
router.get("/", isLoggedIn, getAllUsers);
router.get("/:id", isLoggedIn, getUserDetails);
router.patch("/:id", isLoggedIn, updateUserStatus);

export default router;
