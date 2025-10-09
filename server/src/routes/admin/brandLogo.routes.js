import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

import {
  createBrandLogo,
  getBrandLogos,
  getBrandLogoById,
  updateBrandLogo,
  deleteBrandLogo,
} from "../../controllers/admin/brandLogo.controller.js";

const router = express.Router();

const brandLogoUploadFields = upload.fields([{ name: "icons", maxCount: 10 }]);

router.post(
  "/",
  isLoggedIn,
  brandLogoUploadFields,
  validateFileSize,
  createBrandLogo
);
router.get("/", isLoggedIn, getBrandLogos);
router.get("/:id", isLoggedIn, getBrandLogoById);
router.patch(
  "/:id",
  isLoggedIn,
  brandLogoUploadFields,
  validateFileSize,
  updateBrandLogo
);
router.delete("/:id", isLoggedIn, deleteBrandLogo);

export default router;
