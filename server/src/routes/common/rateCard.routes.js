import express from "express";
import {
  getRateCardById,
  getRateCards,
} from "../../controllers/common/rateCard.controller.js";

const router = express.Router();

router.get("/", getRateCards);
router.get("/:id", getRateCardById);

export default router;
