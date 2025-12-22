import express from "express";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";
import { createBookingAdditionalParts } from "../../controllers/serviceman/bookingAdditionalPart.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createBookingAdditionalParts);

export default router;
