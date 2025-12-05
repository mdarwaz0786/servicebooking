import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createDisclaimer, deleteDisclaimer, getDisclaimerById, getDisclaimers, updateDisclaimer } from "../../controllers/admin/disclaimer.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createDisclaimer);
router.get("/", isLoggedIn, getDisclaimers);
router.get("/:id", isLoggedIn, getDisclaimerById);
router.patch("/:id", isLoggedIn, updateDisclaimer);
router.delete("/:id", isLoggedIn, deleteDisclaimer);

export default router;
