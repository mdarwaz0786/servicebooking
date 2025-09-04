import express from "express";
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService
} from "../controllers/service.controller.js";
import upload from "../middlewares/multer.middleware.js"
import validateFileSize from "../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create service
router.post(
  "/create-service",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  createService
);

// Get all services
router.get("/", getServices);

// Get single service
router.get("/:id", getServiceById);

// Update service
router.patch(
  "/update-service/:id",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  updateService
);

// Delete service
router.delete("/delete-service/:id", isLoggedIn, deleteService);

export default router;
