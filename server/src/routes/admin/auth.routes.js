import express from "express";
import { registerUser, loginUser, loggedInUser } from "../../controllers/admin/auth.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedIn", isLoggedIn, loggedInUser);

export default router;
