import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import {
  createServiceManProfile,
  deleteServiceManProfile,
  getServiceManProfileById,
  getServiceManProfiles,
  updateServiceManProfile
} from "../../controllers/serviceman/servicemanProfile.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createServiceManProfile);
router.get("/", isLoggedIn, getServiceManProfiles);
router.get("/:id", isLoggedIn, getServiceManProfileById);
router.patch("/:id", isLoggedIn, updateServiceManProfile);
router.delete("/:id", isLoggedIn, deleteServiceManProfile);

export default router;
