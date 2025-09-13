import CategoryModel from "../../models/category.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create Category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Category name is required");
  };

  let imagePath = null;

  try {
    if (req.file) {
      imagePath = await compressImage(req.file.buffer, "category");
    };

    const category = await CategoryModel.create({
      name,
      shortDescription,
      fullDescription,
      createdBy: req.user?._id,
      image: imagePath,
    });

    const slug = await generateUniqueSlug(name, "Category", category._id, "categories");

    category.slug = slug;
    await category.save();

    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

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
    .populate("createdBy updatedBy")
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      populate: {
        path: "subSubCategories",
        match: { status: true },
        options: { sort: { createdAt: -1 } },
        strictPopulate: false,
        populate: {
          path: "subSubSubCategories",
          match: { status: true },
          options: { sort: { createdAt: -1 } },
          strictPopulate: false,
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
    .populate("createdBy updatedBy")
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      populate: {
        path: "subSubCategories",
        match: { status: true },
        options: { sort: { createdAt: -1 } },
        strictPopulate: false,
        populate: {
          path: "subSubSubCategories",
          match: { status: true },
          options: { sort: { createdAt: -1 } },
          strictPopulate: false,
        }
      }
    });

  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  return res.status(200).json({ success: true, data: category });
});

//  Update Category
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, status } = req.body;

  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  if (req.file) {
    if (category.image && fs.existsSync(path.join(process.cwd(), category.image))) {
      fs.unlinkSync(path.join(process.cwd(), category.image));
    };
    category.image = await compressImage(req.file.buffer, "category");
  };

  if (name && name !== category.name) {
    await SlugModel.deleteOne({
      collectionName: "Category",
      documentId: category?._id,
    });

    const newSlug = await generateUniqueSlug(name, "Category", category?._id, "categories");
    category.slug = newSlug;
  };

  category.name = name || category.name;
  category.shortDescription = shortDescription || category.shortDescription;
  category.fullDescription = fullDescription || category.fullDescription;
  category.status = typeof status === "boolean" ? status : category.status;
  category.updatedBy = req.user?._id;

  await category.save();

  return res.status(200).json({ success: true, data: category });
});

//  Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  if (category.image && fs.existsSync(path.join(process.cwd(), category.image))) {
    fs.unlinkSync(path.join(process.cwd(), category.image));
  };

  await SlugModel.deleteOne({
    collectionName: "Category",
    documentId: category?._id,
  });

  await category.deleteOne();

  return res.status(200).json({ success: true, message: "Category deleted successfully" });
});
