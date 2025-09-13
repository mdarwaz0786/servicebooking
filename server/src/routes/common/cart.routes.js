import express from "express";
import {
  addToCart,
  getCartItems,
} from "../../controllers/common/cart.controller.js";

const router = express.Router();

// Add a service to cart
router.post("/create-cart", addToCart);

// Get all cart items of loggedin user
router.get("/", getCartItems);

export default router;
