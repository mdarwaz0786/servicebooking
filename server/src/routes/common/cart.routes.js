import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../../controllers/common/cart.controller.js";

const router = express.Router();

// Add a service to cart
router.post("/create-cart", addToCart);

// Get all cart items of loggedin user
router.get("/", getCartItems);

// Update quantity of a specific cart item
router.put("/update-cart/:id", updateCartItem);

// Remove a specific cart item
router.delete("/delete-cart/:id", removeCartItem);

// Clear all cart items
router.delete("/clear", clearCart);

export default router;
