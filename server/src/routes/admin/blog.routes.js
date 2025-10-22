import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../../controllers/admin/blog.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "detailImage", maxCount: 1 },
  ]),
  validateFileSize,
  createBlog
);

router.get("/", isLoggedIn, getBlogs);

router.get("/:id", isLoggedIn, getBlogById);

router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "detailImage", maxCount: 1 },
  ]),
  validateFileSize,
  updateBlog
);

router.delete("/:id", isLoggedIn, deleteBlog);

export default router;
