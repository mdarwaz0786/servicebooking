import LocalityModel from "../../models/locality.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createLocality = asyncHandler(async (req, res) => {
  const { cityId, name, latitude, longitude, description } = req.body;

  if (!cityId) throw new ApiError(400, "City ID is required");
  if (!name?.trim()) throw new ApiError(400, "Locality name is required");

  const locality = await LocalityModel.create({
    cityId,
    name,
    latitude,
    longitude,
    description,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, data: locality });
});

export const getLocalities = asyncHandler(async (req, res) => {
  let { search, cityId, page, limit, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (cityId) filters.cityId = cityId;
  if (search) filters.name = { $regex: search, $options: "i" };

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const localities = await LocalityModel
    .find(filters)
    .populate("cityId")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await LocalityModel.countDocuments(filters);
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
    data: localities,
    pagination: buildPagination({ page, limit, total })
  });
});

export const getLocalityById = asyncHandler(async (req, res) => {
  const locality = await LocalityModel.findById(req.params.id).populate("cityId");
  if (!locality) throw new ApiError(404, "Locality not found");
  return res.status(200).json({ success: true, data: locality });
});

export const updateLocality = asyncHandler(async (req, res) => {
  const { cityId, name, latitude, longitude, description, status } = req.body;

  const locality = await LocalityModel.findById(req.params.id);
  if (!locality) throw new ApiError(404, "Locality not found");

  locality.cityId = cityId !== undefined ? cityId : locality.cityId;
  locality.name = name !== undefined ? name : locality.name;
  locality.latitude = latitude !== undefined ? latitude : locality.latitude;
  locality.longitude = longitude !== undefined ? longitude : locality.longitude;
  locality.description = description !== undefined ? description : locality.description;
  locality.status = typeof status === "boolean" ? status : locality.status;
  locality.updatedBy = req.user?._id;
  locality.updatedAt = new Date();

  await locality.save();

  return res.status(200).json({ success: true, data: locality });
});

export const deleteLocality = asyncHandler(async (req, res) => {
  const locality = await LocalityModel.findById(req.params.id);
  if (!locality) throw new ApiError(404, "Locality not found");

  await locality.deleteOne();

  return res.status(200).json({ success: true, message: "Locality deleted successfully" });
});
