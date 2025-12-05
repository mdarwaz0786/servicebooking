import express from "express";
import { getGoogleReviews, getReviewById, getReviews } from "../../controllers/common/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/:id", getReviewById);
router.get("/google-review", getGoogleReviews);

export default router;
