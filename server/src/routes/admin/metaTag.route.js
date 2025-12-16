import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createMetaTag, deleteMetaTag, getMetaTagById, getMetaTags, updateMetaTag } from "../../controllers/admin/metaTag.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post("/",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  createMetaTag,
);

router.get("/", isLoggedIn, getMetaTags);
router.get("/:id", isLoggedIn, getMetaTagById);
router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  updateMetaTag,
);

router.delete("/:id", isLoggedIn, deleteMetaTag);

export default router;
