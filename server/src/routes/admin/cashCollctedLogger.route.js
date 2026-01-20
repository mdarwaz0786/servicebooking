import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createCashCollected, getCashCollectedById, getCashCollectedList } from "../../controllers/admin/cashCollectedLogger.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createCashCollected);
router.get("/", isLoggedIn, getCashCollectedList);
router.get("/:id", isLoggedIn, getCashCollectedById);

export default router;
