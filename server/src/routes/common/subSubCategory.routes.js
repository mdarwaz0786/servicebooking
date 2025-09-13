import express from "express";
import {
  getSubSubCategories,
  getSubSubCategoryById,
} from "../../controllers/common/subSubCategory.controller.js";

const router = express.Router();

// Get all sub sub categories
router.get("/", getSubSubCategories);

// Get single sub sub category
router.get("/:id", getSubSubCategoryById);

export default router;
