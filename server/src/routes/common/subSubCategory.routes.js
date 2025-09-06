import express from "express";
import {
  createSubSubCategory,
  deleteSubSubCategory,
  getSubSubCategories,
  getSubSubCategoryById,
  updateSubSubCategory
} from "../../controllers/common/subSubCategory.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/common/auth.middleware.js";

const router = express.Router();

// Create sub sub category
router.post(
  "/create-sub-sub-category",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  createSubSubCategory
);

// Get all sub sub categories
router.get("/", getSubSubCategories);

// Get single sub sub category
router.get("/:id", getSubSubCategoryById);

// Update sub sub category
router.patch(
  "/update-sub-sub-category/:id",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  updateSubSubCategory
);

// Delete sub sub category
router.delete("/delete-sub-sub-category/:id", isLoggedIn, deleteSubSubCategory);

export default router;
