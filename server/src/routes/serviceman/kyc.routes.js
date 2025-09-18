import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import {
  createKyc,
  getKycById,
} from "../../controllers/serviceman/kyc.controller.js";
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

router.get("/detail", isLoggedIn, getKycById);

export default router;
