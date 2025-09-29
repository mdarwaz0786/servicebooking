import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import {
  createServiceManProfile,
  getServiceManProfileById,
} from "../../controllers/serviceman/servicemanProfile.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, upload.fields([{ name: "profileImage", maxCount: 1 }]), validateFileSize, createServiceManProfile);
router.get("/detail", isLoggedIn, getServiceManProfileById);

export default router;
