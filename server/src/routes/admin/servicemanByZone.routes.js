import express from "express";
import { getServicemenByZone } from "../../controllers/admin/servicemanByZone.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router()

router.get("/", isLoggedIn, getServicemenByZone);

export default router;
