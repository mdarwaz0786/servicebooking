import express from "express";
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand
} from "../../controllers/admin/brand.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  createBrand
);

router.get("/", isLoggedIn, getBrands);

router.get("/:id", isLoggedIn, getBrandById);

router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  updateBrand
);

router.delete("/:id", isLoggedIn, deleteBrand);

export default router;
