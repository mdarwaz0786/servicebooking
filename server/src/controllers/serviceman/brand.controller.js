import BrandModel from "../../models/brand.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const getBrands = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const brands = await BrandModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BrandModel.countDocuments(filters);
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
    data: brands,
    pagination: buildPagination({ page, limit, total })
  });
});