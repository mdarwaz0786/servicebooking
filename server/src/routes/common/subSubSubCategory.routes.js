import express from "express";
import {
  getSubSubSubCategories,
  getSubSubSubCategoryById,
} from "../../controllers/common/subSubSubCategory.controller.js";

const router = express.Router();

// Get all sub sub sub categories
router.get("/", getSubSubSubCategories);

// Get single sub sub category
router.get("/:id", getSubSubSubCategoryById);

export default router;
