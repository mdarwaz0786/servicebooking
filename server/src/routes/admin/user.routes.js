import express from "express";
import {
  getAllUsers,
  registerUser,
} from "../../controllers/admin/user.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/register", isLoggedIn, registerUser);
router.get("/", isLoggedIn, getAllUsers);

export default router;
