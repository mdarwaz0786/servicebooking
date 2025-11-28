import express from "express";
import {
  createProductStore,
  getProductStores,
  getProductStoreById,
  updateProductStore,
  deleteProductStore
} from "../../controllers/admin/productStore.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  createProductStore
);

router.get("/", isLoggedIn, getProductStores);

router.get("/:id", isLoggedIn, getProductStoreById);

router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  updateProductStore
);

router.delete("/:id", isLoggedIn, deleteProductStore);

export default router;
