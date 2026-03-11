import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import {
  createServiceManProfile,
  deleteServiceManProfile,
  getServiceManProfileById,
  getServiceManProfiles,
  updateServiceManProfile,
  updateServiceManProfileStatus
} from "../../controllers/admin/servicemanProfile.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, upload.fields([{ name: "profileImage", maxCount: 1 }]), validateFileSize, createServiceManProfile);
router.get("/", isLoggedIn, getServiceManProfiles);
router.get("/:id", isLoggedIn, getServiceManProfileById);
router.patch("/update-status/:id", isLoggedIn, updateServiceManProfileStatus);
router.patch("/:id", isLoggedIn, upload.fields([{ name: "profileImage", maxCount: 1 }]), validateFileSize, updateServiceManProfile);
router.delete("/:id", isLoggedIn, deleteServiceManProfile);

export default router;
