import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../controllers/admin/category.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

// Create category
router.post(
  "/create-category",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
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
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  validateFileSize,
  updateCategory
);

// Delete category
router.delete("/delete-category/:id", isLoggedIn, deleteCategory);

export default router;
