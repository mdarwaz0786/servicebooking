import express from "express";
import {
  createBlogCategory,
  getBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
} from "../../controllers/admin/blogCategory.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createBlogCategory);
router.get("/", isLoggedIn, getBlogCategories);
router.get("/:id", isLoggedIn, getBlogCategoryById);
router.patch("/:id", isLoggedIn, updateBlogCategory);
router.delete("/:id", isLoggedIn, deleteBlogCategory);

export default router;
