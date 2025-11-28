import CityModel from "../../models/city.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import { buildPagination } from "../../utils/pagination.js";

export const createCity = asyncHandler(async (req, res) => {
  const { name, code } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "City name is required");
  }

  let city = await CityModel.create({
    name,
    code,
    createdBy: req.user?._id,
  });

  const slug = await generateUniqueSlug(name, "City", city._id, "cities");
  city.slug = slug;
  await city.save();

  return res.status(201).json({ success: true, data: city });
});

export const getCities = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }
  if (status !== undefined) {
    filters.status = status === "true";
  }

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else sortOption = { createdAt: -1 };

  const cities = await CityModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await CityModel.countDocuments(filters);
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
    data: cities,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getCityById = asyncHandler(async (req, res) => {
  const city = await CityModel.findById(req.params.id);

  if (!city) {
    throw new ApiError(404, "City not found");
  }

  return res.status(200).json({ success: true, data: city });
});

export const updateCity = asyncHandler(async (req, res) => {
  const { name, code, status } = req.body;

  const city = await CityModel.findById(req.params.id);
  if (!city) {
    throw new ApiError(404, "City not found");
  }

  if (name && name !== city.name) {
    await SlugModel.deleteOne({
      collectionName: "City",
      documentId: city._id,
    });

    const newSlug = await generateUniqueSlug(name, "City", city._id, "cities");
    city.slug = newSlug;
  }

  city.name = name !== undefined ? name : city.name;
  city.code = code !== undefined ? code : city.code;
  city.status = typeof status === "boolean" ? status : city.status;
  city.updatedBy = req.user?._id;
  city.updatedAt = new Date();

  await city.save();

  return res.status(200).json({ success: true, data: city });
});

export const deleteCity = asyncHandler(async (req, res) => {
  const city = await CityModel.findById(req.params.id);
  if (!city) {
    throw new ApiError(404, "City not found");
  }

  await SlugModel.deleteOne({
    collectionName: "City",
    documentId: city._id,
  });

  await city.deleteOne();

  return res
    .status(200)
    .json({ success: true, message: "City deleted successfully" });
});
