import SubCategoryModel from "../../models/subCategory.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Get all sub category
export const getSubCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, categoryId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;
  const filters = {};

  if (categoryId) {
    filters.categoryId = categoryId;
  };

  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  };

  filters.status = true;

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  let subCategories = await SubCategoryModel
    .find(filters)
    .populate({ path: "category", select: "-createdBy -updatedBy", })
    .populate({
      path: "subSubCategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      select: "-createdBy -updatedBy",
      populate: {
        path: "subSubSubCategories",
        match: { status: true },
        options: { sort: { createdAt: -1 } },
        strictPopulate: false,
        select: "-createdBy -updatedBy",
      }
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  subCategories = subCategories.map((sub) => {
    const subSubCategoryCount = sub.subSubCategories?.length || 0;

    const subSubSubCategoryCount = sub.subSubCategories?.reduce((acc, subsub) => {
      return acc + (subsub.subSubSubCategories?.length || 0);
    }, 0) || 0;

    return {
      ...sub,
      subSubCategoryCount,
      subSubSubCategoryCount
    };
  });

  const total = await SubCategoryModel.countDocuments(filters);
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
    data: subCategories,
    pagination: buildPagination({ page, limit, total }),
  });
});

// get single sub category
export const getSubCategoryById = asyncHandler(async (req, res) => {
  const subCategory = await SubCategoryModel
    .findById(req.params.id)
    .populate({ path: "category", select: "-createdBy -updatedBy" })
    .populate({
      path: "subSubCategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      select: "-createdBy -updatedBy",
      populate: {
        path: "subSubSubCategories",
        match: { status: true },
        options: { sort: { createdAt: -1 } },
        strictPopulate: false,
        select: "-createdBy -updatedBy",
      }
    });

  if (!subCategory) {
    throw new ApiError(404, "Subcategory not found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: subCategory });
});
