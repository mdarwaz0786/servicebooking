import AreaZoneModel from "../../models/areaZone.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createAreaZone = asyncHandler(async (req, res) => {
  const { localityIds, name, radius, latitude, longitude, description } = req.body;

  if (!name?.trim()) throw new ApiError(400, "Area zone name is required");
  if (!localityIds || !Array.isArray(localityIds) || localityIds.length === 0)
    throw new ApiError(400, "At least one locality is required");

  const areaZone = await AreaZoneModel.create({
    localityIds,
    name,
    radius,
    latitude,
    longitude,
    description,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, data: areaZone });
});

export const getAreaZones = asyncHandler(async (req, res) => {
  let { search, page, limit, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.name = { $regex: search, $options: "i" };

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const areaZones = await AreaZoneModel.find(filters)
    .populate("localityIds")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await AreaZoneModel.countDocuments(filters);
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
    data: areaZones,
    pagination: buildPagination({ page, limit, total })
  });
});

export const getAreaZoneById = asyncHandler(async (req, res) => {
  const areaZone = await AreaZoneModel.findById(req.params.id).populate("localityIds");
  if (!areaZone) throw new ApiError(404, "Area zone not found");
  return res.status(200).json({ success: true, data: areaZone });
});

export const updateAreaZone = asyncHandler(async (req, res) => {
  const { localityIds, name, radius, latitude, longitude, description, status } = req.body;

  const areaZone = await AreaZoneModel.findById(req.params.id);
  if (!areaZone) throw new ApiError(404, "Area zone not found");

  areaZone.localityIds = localityIds || areaZone.localityIds;
  areaZone.name = name !== undefined ? name : areaZone.name;
  areaZone.radius = radius !== undefined ? radius : areaZone.radius;
  areaZone.latitude = latitude !== undefined ? latitude : areaZone.latitude;
  areaZone.longitude = longitude !== undefined ? longitude : areaZone.longitude;
  areaZone.description = description !== undefined ? description : areaZone.description;
  areaZone.status = typeof status === "boolean" ? status : areaZone.status;
  areaZone.updatedBy = req.user?._id;
  areaZone.updatedAt = new Date();

  await areaZone.save();

  return res.status(200).json({ success: true, data: areaZone });
});

export const deleteAreaZone = asyncHandler(async (req, res) => {
  const areaZone = await AreaZoneModel.findById(req.params.id);
  if (!areaZone) throw new ApiError(404, "Area zone not found");

  await areaZone.deleteOne();

  return res.status(200).json({ success: true, message: "Area zone deleted successfully" });
});
