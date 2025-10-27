import express from "express";
import {
  createRateCard,
  deleteRateCard,
  getRateCardById,
  getRateCards,
  updateRateCard
} from "../../controllers/admin/rateCard.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createRateCard);
router.get("/", isLoggedIn, getRateCards);
router.get("/:id", isLoggedIn, getRateCardById);
router.patch("/:id", isLoggedIn, updateRateCard);
router.delete("/:id", isLoggedIn, deleteRateCard);

export default router;
