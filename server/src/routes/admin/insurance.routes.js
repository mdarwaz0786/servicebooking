import express from "express";
import {
  createInsurance,
  getInsurances,
  getInsuranceById,
  updateInsurance,
  deleteInsurance,
} from "../../controllers/admin/insurance.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  createInsurance
);

router.get("/", isLoggedIn, getInsurances);

router.get("/:id", isLoggedIn, getInsuranceById);

router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  updateInsurance
);

router.delete("/:id", isLoggedIn, deleteInsurance);

export default router;
