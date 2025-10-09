import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

import {
  createExpertTechnician,
  getExpertTechnicians,
  getExpertTechnicianById,
  updateExpertTechnician,
  deleteExpertTechnician,
} from "../../controllers/admin/expertTechnician.controller.js";

const router = express.Router();
router.post(
  "/",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icons", maxCount: 10 },
  ]),
  validateFileSize,
  createExpertTechnician
);
router.get("/", isLoggedIn, getExpertTechnicians);
router.get("/:id", isLoggedIn, getExpertTechnicianById);
router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icons", maxCount: 10 },
  ]),
  validateFileSize,
  updateExpertTechnician
);
router.delete("/:id", isLoggedIn, deleteExpertTechnician);

export default router;
