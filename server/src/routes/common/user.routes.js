import express from "express";
import { registerUser, loginUser, loggedInUser } from "../../controllers/common/auth.controller.js";
import isLoggedIn from "../../middlewares/common/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/loggedIn", isLoggedIn, loggedInUser);

export default router;
