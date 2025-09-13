import SubSubCategoryModel from "../../models/subSubCategory.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Get all sub sub category
export const getSubSubCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, categoryId, subCategoryId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  if (status !== undefined) filters.status = status === "true";

  if (subCategoryId) {
    filters.subCategoryId = subCategoryId;
  };

  if (categoryId) {
    filters.categoryId = categoryId;
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  let subSubCategories = await SubSubCategoryModel
    .find(filters)
    .populate("category subCategory")
    .populate({
      path: "subSubSubCategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  subSubCategories = subSubCategories.map((subsub) => {
    const subSubSubCategoryCount = subsub.subSubSubCategories?.length || 0;

    return {
      ...subsub,
      subSubSubCategoryCount
    };
  });

  const total = await SubSubCategoryModel.countDocuments(filters);
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
    data: subSubCategories,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get single sub sub category
export const getSubSubCategoryById = asyncHandler(async (req, res) => {
  const subSubCategory = await SubSubCategoryModel
    .findById(req.params.id)
    .populate("category subCategory")
    .populate({
      path: "subSubSubCategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
    });

  if (!subSubCategory) throw new ApiError(404, "Sub sub category not found");

  return res.status(200).json({ success: true, message: "Data fetch successfully", data: subSubCategory });
});