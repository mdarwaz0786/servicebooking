import express from "express";
import { removeAfterCompleteMedia, removeBeforeStartMedia, uploadAfterCompleteMedia, uploadBeforeStartMedia } from "../../controllers/serviceman/servicemanBookingUploads.controller.js";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post(
  "/upload-before-start/:servicemanBookingId",
  isLoggedIn,
  upload.fields([{ name: "images" }, { name: "videos" }]),
  validateFileSize,
  uploadBeforeStartMedia,
);

router.post(
  "/upload-after-complete/:servicemanBookingId",
  isLoggedIn,
  upload.fields([{ name: "images" }, { name: "videos" }]),
  validateFileSize,
  uploadAfterCompleteMedia,
);

router.delete(
  "/remove-before-start/:servicemanBookingId",
  isLoggedIn,
  removeBeforeStartMedia,
);

router.delete(
  "/remove-after-complete/:servicemanBookingId",
  isLoggedIn,
  removeAfterCompleteMedia,
);

export default router;
