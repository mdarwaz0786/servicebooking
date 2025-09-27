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
router.get("/", isLoggedIn, getReviews);
router.get("/:id", isLoggedIn, getReviewById);
router.patch("/:id", isLoggedIn, isLoggedIn, updateReview);
router.delete("/:id", isLoggedIn, deleteReview);

export default router;
