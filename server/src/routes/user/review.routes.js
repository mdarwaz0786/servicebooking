import express from "express";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../../controllers/user/review.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.patch("/:id", isLoggedIn, updateReview);
router.delete("/:id", isLoggedIn, deleteReview);

export default router;
