import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createZone, deleteZone, getZoneById, getZones, updateZone } from "../../controllers/admin/zone.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createZone);
router.get("/", isLoggedIn, getZones);
router.get("/:id", isLoggedIn, getZoneById);
router.patch("/:id", isLoggedIn, updateZone);
router.delete("/:id", isLoggedIn, deleteZone);

export default router;
