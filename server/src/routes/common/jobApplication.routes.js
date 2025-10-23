import express from "express";
import {
  createJobApplication,
} from "../../controllers/common/jobApplication.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "resume", maxCount: 1 },]),
  validateFileSize,
  createJobApplication,
);

export default router;
