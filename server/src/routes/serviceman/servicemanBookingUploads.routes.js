import express from "express";
import { createServicemanBookingUpload } from "../../controllers/serviceman/servicemanBookingUploads.controller.js";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 10 },
  ]),
  validateFileSize,
  createServicemanBookingUpload,
);

export default router;
