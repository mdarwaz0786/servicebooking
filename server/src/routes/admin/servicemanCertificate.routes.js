import express from "express";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createServicemanCertificate,
  deleteServicemanCertificate,
  getServicemanCertificateById,
  getServicemanCertificates,
  updateServicemanCertificate
} from "../../controllers/admin/servicemanCertificate.controller.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.fields([
    { name: "file", maxCount: 1 },
  ]),
  validateFileSize,
  createServicemanCertificate,
);

router.get("/", getServicemanCertificates);
router.get("/:id", getServicemanCertificateById);

router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([
    { name: "file", maxCount: 1 },
  ]),
  validateFileSize,
  updateServicemanCertificate
);

router.delete("/:id", isLoggedIn, deleteServicemanCertificate);

export default router;
