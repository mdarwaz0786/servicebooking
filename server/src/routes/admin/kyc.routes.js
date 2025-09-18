import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createKyc,
  getKycs,
  getKycById,
  updateKyc,
  deleteKyc,
} from "../../controllers/admin/kyc.controller.js";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  upload.fields([
    { name: "passbookOrCheque", maxCount: 1 },
    { name: "panCardImage", maxCount: 1 },
    { name: "aadharFrontImage", maxCount: 1 },
    { name: "aadharBackImage", maxCount: 1 },
    { name: "shopImage", maxCount: 1 },
  ]),
  validateFileSize,
  createKyc
);

router.get("/", isLoggedIn, getKycs);
router.get("/:id", isLoggedIn, getKycById);

router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([
    { name: "passbookOrCheque", maxCount: 1 },
    { name: "panCardImage", maxCount: 1 },
    { name: "aadharFrontImage", maxCount: 1 },
    { name: "aadharBackImage", maxCount: 1 },
    { name: "shopImage", maxCount: 1 },
  ]),
  validateFileSize,
  updateKyc,
);

router.delete("/:id", isLoggedIn, deleteKyc);

export default router;
