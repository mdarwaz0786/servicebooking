import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controllers/cart.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add a service to cart
router.post("/create-cart", isLoggedIn, addToCart);

// Get all cart items of loggedin user
router.get("/", isLoggedIn, getCartItems);

// Update quantity of a specific cart item
router.put("/update-cart/:id", isLoggedIn, updateCartItem);

// Remove a specific cart item
router.delete("/delete-cart/:id", isLoggedIn, removeCartItem);

// Clear all cart items
router.delete("/clear", isLoggedIn, clearCart);

export default router;
