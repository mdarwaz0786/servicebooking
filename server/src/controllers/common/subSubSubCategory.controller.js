import SubSubSubCategoryModel from "../../models/subSubSubCategory.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Get all sub sub sub category
export const getSubSubSubCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, categoryId, subCategoryId, subSubCategoryId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  };

  if (status !== undefined) {
    filters.status = status === "true";
  };

  if (categoryId) {
    filters.categoryId = categoryId;
  };

  if (subCategoryId) {
    filters.subCategoryId = subCategoryId;
  };

  if (subSubCategoryId) {
    filters.subSubCategoryId = subSubCategoryId;
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  const categories = await SubSubSubCategoryModel
    .find(filters)
    .populate("category subCategory subSubCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const total = await SubSubSubCategoryModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetch successfully",
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

// Get single sub sub sub category
export const getSubSubSubCategoryById = asyncHandler(async (req, res) => {
  const subSubSubCategory = await SubSubSubCategoryModel
    .findById(req.params.id)
    .populate("category subCategory subSubCategory createdBy updatedBy");

  if (!subSubSubCategory) {
    throw new ApiError(404, "Sub sub sub category not found");
  };

  return res.status(200).json({ success: true, message: "Data fetch successfully", data: subSubSubCategory });
});
