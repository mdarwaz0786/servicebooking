import express from "express";
import {
  createAddress,
  getAddresses,
  getAddressById,
  deleteAddress
} from "../../controllers/user/address.controller.js";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";

const router = express.Router();

// Create a new address
router.post("/create-address", isLoggedIn, createAddress);

// Get all addresses
router.get("/", isLoggedIn, getAddresses);

// Get a single address by ID
router.get("/:id", isLoggedIn, getAddressById);

// Delete an address by ID
router.delete("/delete-address/:id", isLoggedIn, deleteAddress);

export default router;
