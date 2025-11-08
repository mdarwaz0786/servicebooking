import express from "express";
import {
  getRateCardById,
  getRateCards,
  getRateCardByServiceId,
} from "../../controllers/common/rateCard.controller.js";

const router = express.Router();

router.get("/", getRateCards);
// router.get("/:id", getRateCardById);
router.get("/:serviceId", getRateCardByServiceId);

export default router;
