import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory
} from "../../controllers/common/subCategory.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/common/auth.middleware.js";

const router = express.Router();

// Create sub category
router.post(
  "/create-sub-category",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  createSubCategory
);

// Get all sub categories
router.get("/", getSubCategories);

// Get single sub category
router.get("/:id", getSubCategoryById);

// Update sub category
router.patch(
  "/update-sub-category/:id",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  updateSubCategory
);

// Delete sub category
router.delete("/delete-sub-category/:id", isLoggedIn, deleteSubCategory);

export default router;
