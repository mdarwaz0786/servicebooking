import express from "express";
import {
  getSubCategories,
  getSubCategoryById,
} from "../../controllers/common/subCategory.controller.js";

const router = express.Router();

// Get all sub categories
router.get("/", getSubCategories);

// Get single sub category
router.get("/:id", getSubCategoryById);

export default router;
