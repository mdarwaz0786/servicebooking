import CombinedZoneModel from "../../models/combinedZone.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createCombinedZone = asyncHandler(async (req, res) => {
  const { name, zones } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Combined zone name is required");
  }

  if (!zones || !Array.isArray(zones) || zones.length === 0) {
    throw new ApiError(400, "At least one zone is required");
  }

  const combinedZone = await CombinedZoneModel.create({
    name,
    zones,
    createdBy: req.user?._id
  });

  return res.status(201).json({
    success: true,
    data: combinedZone
  });
});

export const getCombinedZones = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;

  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } }
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else sortOption = { createdAt: -1 };

  const combinedZones = await CombinedZoneModel.find(filters)
    .populate("zones")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await CombinedZoneModel.countDocuments(filters);
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
    data: combinedZones,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getCombinedZoneById = asyncHandler(async (req, res) => {
  const combinedZone = await CombinedZoneModel.findById(req.params.id)
    .populate("zones");

  if (!combinedZone) {
    throw new ApiError(404, "Combined zone not found");
  }

  return res.status(200).json({
    success: true,
    data: combinedZone
  });
});

export const updateCombinedZone = asyncHandler(async (req, res) => {
  const { name, zones, status } = req.body;

  const combinedZone = await CombinedZoneModel.findById(req.params.id);

  if (!combinedZone) {
    throw new ApiError(404, "Combined zone not found");
  }

  combinedZone.name = name !== undefined ? name : combinedZone.name;
  combinedZone.zones = zones !== undefined ? zones : combinedZone.zones;
  combinedZone.status =
    typeof status === "boolean" ? status : combinedZone.status;

  combinedZone.updatedBy = req.user?._id;
  combinedZone.updatedAt = new Date();

  await combinedZone.save();

  return res.status(200).json({
    success: true,
    data: combinedZone
  });
});

export const deleteCombinedZone = asyncHandler(async (req, res) => {
  const combinedZone = await CombinedZoneModel.findById(req.params.id);

  if (!combinedZone) {
    throw new ApiError(404, "Combined zone not found");
  }

  await combinedZone.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Combined zone deleted successfully"
  });
});