import KycModel from "../../models/kyc.model.js";
import { buildPagination } from "../../utils/pagination.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import path from "path";
import fs from "fs";

// Create KYC
export const createKyc = asyncHandler(async (req, res) => {
  const { accountNumber, confirmAccountNumber } = req.body;

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
      createdBy: req.user?._id,
      passbookOrCheque: passbookOrChequePath,
      panCardImage: panCardImagePath,
      aadharFrontImage: aadharFrontPath,
      aadharBackImage: aadharBackPath,
      shopImage: shopImagePath,
    });

    return res.status(201).json({
      success: true,
      message: "KYC submitted successfully",
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

// Get All KYC
export const getKycs = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, status, sort = "desc", search, serviceman } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (status) filters.status = status;

  if (serviceman) {
    filters.userId = serviceman;
  }

  if (search) {
    filters.$or = [
      { status: { $regex: search, $options: "i" } },
    ];
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  const [kycs, total] = await Promise.all([
    KycModel
      .find(filters)
      .populate("user")
      .populate("profile")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    KycModel.countDocuments(filters),
  ]);

  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: kycs,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single KYC by ID
export const getKycById = asyncHandler(async (req, res) => {
  const kyc = await KycModel
    .findById(req.params.id)
    .populate("user")
    .populate("profile");

  if (!kyc) throw new ApiError(404, "KYC not found");

  return res.status(200).json({
    success: true,
    message: "KYC fetched successfully",
    data: kyc,
  });
});

// Update KYC
export const updateKyc = asyncHandler(async (req, res) => {
  const { accountNumber, confirmAccountNumber } = req.body;

  if (
    accountNumber &&
    confirmAccountNumber &&
    accountNumber !== confirmAccountNumber
  ) {
    throw new ApiError(
      400,
      "Account number and confirm account number do not match"
    );
  };

  const kyc = await KycModel.findById(req.params.id);
  if (!kyc) throw new ApiError(404, "KYC not found");

  const fileFields = [
    "passbookOrCheque",
    "panCardImage",
    "aadharFrontImage",
    "aadharBackImage",
    "shopImage",
  ];

  for (const field of fileFields) {
    if (req.files?.[field]?.[0]) {
      if (kyc[field]) {
        const oldPath = path.join(process.cwd(), kyc[field]);
        if (fs.existsSync(oldPath)) {
          await fs.promises.unlink(oldPath).catch(() => { });
        };
      };
      kyc[field] = await compressImage(req.files[field][0].buffer, "kyc");
    };
  };

  kyc.set({
    ...req.body,
    updatedBy: req.user?._id,
  });

  await kyc.save();

  return res.status(200).json({
    success: true,
    message: "KYC updated successfully",
    data: kyc,
  });
});

// Delete KYC
export const deleteKyc = asyncHandler(async (req, res) => {
  const kyc = await KycModel.findByIdAndDelete(req.params.id);

  if (!kyc) throw new ApiError(404, "KYC not found");

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
