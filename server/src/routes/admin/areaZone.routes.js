import express from "express";
import {
  createAreaZone,
  getAreaZones,
  getAreaZoneById,
  updateAreaZone,
  deleteAreaZone
} from "../../controllers/admin/areaZone.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createAreaZone);
router.get("/", isLoggedIn, getAreaZones);
router.get("/:id", isLoggedIn, getAreaZoneById);
router.patch("/:id", isLoggedIn, updateAreaZone);
router.delete("/:id", isLoggedIn, deleteAreaZone);

export default router;
