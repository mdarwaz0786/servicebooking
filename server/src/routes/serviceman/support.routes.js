import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { getSupportContent } from "../../controllers/serviceman/supportContent.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getSupportContent);

export default router;
