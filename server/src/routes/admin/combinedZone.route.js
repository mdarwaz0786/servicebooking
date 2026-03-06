import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createCombinedZone, deleteCombinedZone, getCombinedZoneById, getCombinedZones, updateCombinedZone } from "../../controllers/admin/combinedZone.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createCombinedZone);
router.get("/", isLoggedIn, getCombinedZones);
router.get("/:id", isLoggedIn, getCombinedZoneById);
router.patch("/:id", isLoggedIn, updateCombinedZone);
router.delete("/:id", isLoggedIn, deleteCombinedZone);

export default router;
