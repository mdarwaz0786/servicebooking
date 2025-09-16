import { buildPagination } from "../../utils/pagination.js";
import KycModel from "../../models/Kyc.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Create KYC
export const createKyc = asyncHandler(async (req, res) => {
  const { accountNumber, confirmAccountNumber } = req.body;

  if (accountNumber !== confirmAccountNumber) {
    throw new ApiError(400, "Account number and confirm account number do not match");
  };

  const kyc = await KycModel.create({
    ...req.body,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "KYC submitted successfully",
    data: kyc,
  });
});

// Get All KYC
export const getKycs = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, status, sort = "desc", search } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (status) filters.status = status;

  if (search) {
    const schemaPaths = Object.keys(EarningModel.schema.paths);
    const orFilters = [];

    schemaPaths.forEach((field) => {
      const fieldType = EarningModel.schema.paths[field].instance;

      if (fieldType === "String") {
        orFilters.push({ [field]: { $regex: search, $options: "i" } });
      };

      if (fieldType === "Number" && !isNaN(Number(search))) {
        orFilters.push({ [field]: Number(search) });
      };

      if (fieldType === "Boolean") {
        if (search.toLowerCase() === "true") {
          orFilters.push({ [field]: true });
        };

        if (search.toLowerCase() === "false") {
          orFilters.push({ [field]: false });
        };
      };

      if (fieldType === "ObjectId" && mongoose.isValidObjectId(search)) {
        orFilters.push({ [field]: search });
      };
    });

    if (orFilters.length > 0) {
      filters.$or = orFilters;
    };
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
    KycModel.find(filters)
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
  const kyc = await KycModel.findById(req.params.id);

  if (!kyc) throw new ApiError(404, "KYC not found");

  return res.status(200).json({
    success: true,
    message: "KYC fetched successfully",
    data: kyc,
  });
});

// Update KYC (Admin or User)
export const updateKyc = asyncHandler(async (req, res) => {
  const { accountNumber, confirmAccountNumber } = req.body;

  if (accountNumber && confirmAccountNumber && accountNumber !== confirmAccountNumber) {
    throw new ApiError(400, "Account number and confirm account number do not match");
  };

  const kyc = await KycModel.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: req.user?._id },
    { new: true }
  );

  if (!kyc) throw new ApiError(404, "KYC not found");

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
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
