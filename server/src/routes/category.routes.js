import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import upload from "../middlewares/multer.middleware.js"
import validateFileSize from "../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create category
router.post(
  "/create-category",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  createCategory
);

// Get all categories
router.get("/", getCategories);

// Get single category
router.get("/:id", getCategoryById);

// Update category
router.patch(
  "/update-category/:id",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  updateCategory
);

// Delete category
router.delete("/delete-category/:id", isLoggedIn, deleteCategory);

export default router;
