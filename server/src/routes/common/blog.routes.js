import express from "express";
import {
  getBlogs,
  getBlogById,
} from "../../controllers/common/blog.controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/detail", getBlogById);

export default router;
