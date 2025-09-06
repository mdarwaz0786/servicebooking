import express from "express";
import {
  createSubSubSubCategory,
  deleteSubSubSubCategory,
  getSubSubSubCategories,
  getSubSubSubCategoryById,
  updateSubSubSubCategory
} from "../../controllers/common/subSubSubCategory.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/common/auth.middleware.js";

const router = express.Router();

// Create sub sub sub category
router.post(
  "/create-sub-sub-sub-category",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  createSubSubSubCategory
);

// Get all sub sub sub categories
router.get("/", getSubSubSubCategories);

// Get single sub sub category
router.get("/:id", getSubSubSubCategoryById);

// Update sub sub category
router.patch(
  "/update-sub-sub-sub-category/:id",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  updateSubSubSubCategory
);

// Delete sub sub category
router.delete("/delete-sub-sub-sub-category/:id", isLoggedIn, deleteSubSubSubCategory);

export default router;
