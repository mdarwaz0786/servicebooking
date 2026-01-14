import CityModel from "../../models/city.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const getCities = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  filters.status = true;

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
  const city = await CityModel.findOne({ _id: req.params.id, status: true });

  if (!city) {
    throw new ApiError(404, "City not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: city });
});
