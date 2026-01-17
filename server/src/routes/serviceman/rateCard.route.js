import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { getRateCardById, getRateCards } from "../../controllers/serviceman/rateCart.controller.js";

const router = express.Router();

router.get("/", getRateCards);
router.get("/:id", getRateCardById);

export default router;
