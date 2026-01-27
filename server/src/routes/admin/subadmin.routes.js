import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createSubAdmin, deleteSubAdmin, getSubAdminById, getSubAdmins, updateSubAdmin } from "../../controllers/admin/subadmin.controller.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  createSubAdmin,
);

router.get("/", isLoggedIn, getSubAdmins);
router.get("/:id", isLoggedIn, getSubAdminById);

router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  updateSubAdmin,
);

router.delete("/:id", isLoggedIn, deleteSubAdmin);

export default router;
