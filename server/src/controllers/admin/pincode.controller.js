import PincodeModel from "../../models/pincode.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createPincode = asyncHandler(async (req, res) => {
  const { placeName, pincoode } = req.body;

  if (!pincoode) {
    throw new ApiError(400, "Pincode is required");
  }

  const pincode = await PincodeModel.create({
    placeName,
    pincoode,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: pincode,
  });
});

export const getPincodes = asyncHandler(async (req, res) => {
  let {
    search = "",
    sort = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  page = Math.max(parseInt(page, 10), 1);
  limit = Math.max(parseInt(limit, 10), 1);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search.trim()) {
    filters.$or = [
      { placeName: { $regex: search.trim(), $options: "i" } },
      { pincoode: Number(search) || -1 },
    ];
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const [pincodes, total] = await Promise.all([
    PincodeModel.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    PincodeModel.countDocuments(filters),
  ]);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasPrevPage: page > 1,
    hasNextPage: page * limit < total,
    data: pincodes,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getPincodeById = asyncHandler(async (req, res) => {
  const pincode = await PincodeModel.findById(req.params.id);

  if (!pincode) {
    throw new ApiError(404, "Pincode not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: pincode });
});

export const updatePincode = asyncHandler(async (req, res) => {
  const { placeName, pincoode, status } = req.body;

  const pincode = await PincodeModel.findById(req.params.id);
  if (!pincode) {
    throw new ApiError(404, "Pincode not found");
  }

  if (placeName !== undefined) pincode.placeName = placeName;
  if (pincoode !== undefined) pincode.pincoode = pincoode;
  pincode.status = typeof status === "boolean" ? status : pincode.status;

  pincode.updatedBy = req.user?._id;
  pincode.updatedAt = new Date();

  await pincode.save();

  return res.status(200).json({
    success: true,
    data: pincode,
    message: "Updated successfully",
  });
});

export const deletePincode = asyncHandler(async (req, res) => {
  const pincode = await PincodeModel.findById(req.params.id);

  if (!pincode) {
    throw new ApiError(404, "Pincode not found");
  }

  await pincode.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Pincode deleted successfully",
  });
});
