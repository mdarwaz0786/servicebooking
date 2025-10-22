import BlogCategoryModel from "../../models/blogCategory.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- GET ALL BLOG CATEGORIES ---------------------
export const getBlogCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

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

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const categories = await BlogCategoryModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BlogCategoryModel.countDocuments(filters);
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
    data: categories,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE BLOG CATEGORY ---------------------
export const getBlogCategoryById = asyncHandler(async (req, res) => {
  const blogCategory = await BlogCategoryModel.findById(req.params.id);

  if (!blogCategory) {
    throw new ApiError(404, "Blog category not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: blogCategory,
  });
});
