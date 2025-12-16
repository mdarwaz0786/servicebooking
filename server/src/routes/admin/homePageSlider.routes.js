import express from "express";
import {
  createHomePageSlider,
  deleteHomePageSlider,
  getHomePageSliderById,
  getHomePageSliders,
  updateHomePageSlider
} from "../../controllers/admin/homePageSlider.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileBanner", maxCount: 1 },
  ]),
  validateFileSize,
  createHomePageSlider,
);

router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileBanner", maxCount: 1 },
  ]),
  validateFileSize,
  updateHomePageSlider,
);

router.get("/", getHomePageSliders);

router.get("/:id", getHomePageSliderById);

router.delete("/:id", isLoggedIn, deleteHomePageSlider);

export default router;
