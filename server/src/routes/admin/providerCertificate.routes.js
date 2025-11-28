import express from "express";
import {
  createProviderCertificate,
  getProviderCertificates,
  getProviderCertificateById,
  updateProviderCertificate,
  deleteProviderCertificate
} from "../../controllers/admin/providerCertificate.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createProviderCertificate
);

router.get("/", getProviderCertificates);
router.get("/:id", getProviderCertificateById);

router.patch(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProviderCertificate
);

router.delete("/:id", deleteProviderCertificate);

export default router;
