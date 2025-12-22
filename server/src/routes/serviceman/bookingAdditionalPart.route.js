import express from "express";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";
import { bookingAdditionalPartsCancel, createBookingAdditionalParts } from "../../controllers/serviceman/bookingAdditionalPart.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createBookingAdditionalParts);
router.post("/cancel", isLoggedIn, bookingAdditionalPartsCancel);

export default router;
