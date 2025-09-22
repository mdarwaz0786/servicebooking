import KycModel from "../../models/kyc.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import path from "path";
import fs from "fs";

// Create KYC
export const createKyc = asyncHandler(async (req, res) => {
  const { accountNumber, confirmAccountNumber } = req.body;
  const userId = req.user?._id;

  if (accountNumber !== confirmAccountNumber) {
    throw new ApiError(400, "Account number and confirm account number do not match");
  };

  let passbookOrChequePath = null;
  let panCardImagePath = null;
  let aadharFrontPath = null;
  let aadharBackPath = null;
  let shopImagePath = null;

  try {
    if (req.files?.passbookOrCheque?.[0]) {
      passbookOrChequePath = await compressImage(
        req.files.passbookOrCheque[0].buffer,
        "kyc"
      );
    };

    if (req.files?.panCardImage?.[0]) {
      panCardImagePath = await compressImage(
        req.files.panCardImage[0].buffer,
        "kyc"
      );
    };

    if (req.files?.aadharFrontImage?.[0]) {
      aadharFrontPath = await compressImage(
        req.files.aadharFrontImage[0].buffer,
        "kyc"
      );
    };

    if (req.files?.aadharBackImage?.[0]) {
      aadharBackPath = await compressImage(
        req.files.aadharBackImage[0].buffer,
        "kyc"
      );
    };

    if (req.files?.shopImage?.[0]) {
      shopImagePath = await compressImage(
        req.files.shopImage[0].buffer,
        "kyc"
      );
    };

    const kyc = await KycModel.create({
      ...req.body,
      userId,
      createdBy: req.user?._id,
      passbookOrCheque: passbookOrChequePath,
      panCardImage: panCardImagePath,
      aadharFrontImage: aadharFrontPath,
      aadharBackImage: aadharBackPath,
      shopImage: shopImagePath,
    });

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: kyc,
    });
  } catch (error) {
    const pathsToClean = [
      passbookOrChequePath,
      panCardImagePath,
      aadharFrontPath,
      aadharBackPath,
      shopImagePath,
    ].filter(Boolean);
    for (const filePath of pathsToClean) {
      const absPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(absPath)) {
        await fs.promises.unlink(absPath).catch(() => { });
      };
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get Single KYC by ID
export const getKycById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const kyc = await KycModel.findOne({ userId }).populate("user").populate("profile");

  if (!kyc) throw new ApiError(404, "KYC not found");

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: kyc,
  });
});

