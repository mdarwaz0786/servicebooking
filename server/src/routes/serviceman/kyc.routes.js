import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createKyc,
  getKycs,
  getKycById,
  updateKyc,
  deleteKyc,
} from "../../controllers/serviceman/kyc.controller.js";

const router = express.Router();

// Create KYC
router.post("/", isLoggedIn, createKyc);

// Get all KYCs
router.get("/", isLoggedIn, getKycs);

// Get single KYC by ID
router.get("/:id", isLoggedIn, getKycById);

// Update KYC
router.patch("/:id", isLoggedIn, updateKyc);

// Delete KYC
router.delete("/:id", isLoggedIn, deleteKyc);

export default router;
