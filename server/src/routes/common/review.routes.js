import express from "express";
import { getReviewById, getReviews } from "../../controllers/common/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/:id", getReviewById);

export default router;
