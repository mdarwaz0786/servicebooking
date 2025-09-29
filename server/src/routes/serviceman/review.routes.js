import express from "express";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";
import { getReviewById, getReviews } from "../../controllers/serviceman/review.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getReviews);
router.get("/:id", isLoggedIn, getReviewById);

export default router;
