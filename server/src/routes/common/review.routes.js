import express from "express";
import { getGoogleReviews, getReviewById, getReviews } from "../../controllers/common/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/google-reviews", getGoogleReviews);
router.get("/:id", getReviewById);

export default router;
