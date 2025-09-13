import express from "express";
import {
  getServiceById,
  getServices,
} from "../../controllers/common/service.controller.js";

const router = express.Router();

// Get all services
router.get("/", getServices);

// Get single service
router.get("/:id", getServiceById);

export default router;
