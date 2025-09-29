import express from "express";
import {
  createHomePageBanner,
  updateHomePageBanner,
  getHomePageBanners,
  getHomePageBannerById,
  deleteHomePageBanner
} from "../../controllers/admin/homePageBanner.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  createHomePageBanner,
);

router.patch(
  "/:id",
  isLoggedIn,
  upload.single("image"),
  validateFileSize,
  updateHomePageBanner
);

router.get("/", getHomePageBanners);

router.get("/:id", getHomePageBannerById);

router.delete("/:id", isLoggedIn, deleteHomePageBanner);

export default router;
