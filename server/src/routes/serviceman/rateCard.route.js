import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { getRateCardById, getRateCards } from "../../controllers/serviceman/rateCart.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getRateCards);
router.get("/:id", isLoggedIn, getRateCardById);

export default router;
