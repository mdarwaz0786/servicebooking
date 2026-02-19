import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategoriesByCategoryId,
  getSubCategoryById,
  updateSubCategory
} from "../../controllers/admin/subCategory.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

// Create sub category
router.post(
  "/create-sub-category",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  validateFileSize,
  createSubCategory
);

// Get all sub categories by categoryid
router.get("/by-category", getSubCategoriesByCategoryId);

// Get all sub categories
router.get("/", getSubCategories);

// Get single sub category
router.get("/:id", getSubCategoryById);

// Update sub category
router.patch(
  "/update-sub-category/:id",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  validateFileSize,
  updateSubCategory
);

// Delete sub category
router.delete("/delete-sub-category/:id", isLoggedIn, deleteSubCategory);

export default router;
