import CategoryModel from "../../models/category.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Get All Categories
export const getCategories = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page,
    limit,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
    ];
  };

  if (status !== undefined) {
    filters.status = status === "true";
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  let categories = await CategoryModel
    .find(filters)
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      select: "-createdBy -updatedBy",
      populate: {
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
      }
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  categories = categories.map((cat) => {
    const subCategoryCount = cat.subcategories?.length || 0;

    const subSubCategoryCount = cat.subcategories?.reduce((acc, sub) => {
      return acc + (sub.subSubCategories?.length || 0);
    }, 0) || 0;

    const subSubSubCategoryCount = cat.subcategories?.reduce((acc1, sub) => {
      return acc1 + (sub.subSubCategories?.reduce((acc2, subsub) => {
        return acc2 + (subsub.subSubSubCategories?.length || 0);
      }, 0));
    }, 0) || 0;

    return {
      ...cat,
      subCategoryCount,
      subSubCategoryCount,
      subSubSubCategoryCount
    };
  });

  const total = await CategoryModel.countDocuments(filters);
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

// Get Single Category
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoryModel
    .findById(req.params.id)
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      select: "-createdBy -updatedBy",
      populate: {
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
      }
    });

  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  return res.status(200).json({ success: true, data: category });
});