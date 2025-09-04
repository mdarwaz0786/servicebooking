import express from "express";
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
} from "../controllers/address.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new address
router.post("/create-address", isLoggedIn, createAddress);

// Get all addresses
router.get("/", isLoggedIn, getAddresses);

// Get a single address by ID
router.get("/:id", isLoggedIn, getAddressById);

// Update an existing address by ID
router.put("/update-address/:id", isLoggedIn, updateAddress);

// Delete an address by ID
router.delete("/delete-address/:id", isLoggedIn, deleteAddress);

export default router;
