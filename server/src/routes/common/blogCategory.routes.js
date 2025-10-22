import express from "express";
import {
  getBlogCategories,
  getBlogCategoryById,
} from "../../controllers/common/blogCategory.controller.js";

const router = express.Router();

router.get("/", getBlogCategories);
router.get("/:id", getBlogCategoryById);

export default router;
