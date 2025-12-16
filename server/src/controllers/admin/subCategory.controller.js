import SubCategoryModel from "../../models/subCategory.model.js";
import CategoryModel from "../../models/category.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create sub categories
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, categoryId } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Sub category name is required");
  };

  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "category not found");
  };

  let imagePath = null;
  let iconPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "subCategory");
    };

    if (req.files?.icon?.[0]) {
      iconPath = await compressImage(req.files.icon[0].buffer, "subCategory");
    };

    const subCategory = await SubCategoryModel.create({
      name,
      shortDescription,
      fullDescription,
      categoryId,
      createdBy: req.user?._id,
      image: imagePath,
      icon: iconPath,
    });

    const slug = await generateUniqueSlug(name, "SubCategory", subCategory._id, "sub-categories");
    subCategory.slug = slug;
    await subCategory.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: subCategory });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    if (iconPath && fs.existsSync(path.join(process.cwd(), iconPath))) {
      fs.unlinkSync(path.join(process.cwd(), iconPath));
    };
    if (error.code === 11000) {
      throw new ApiError(409, "Variant already exists");
    }
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

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

  let subCategories = await SubCategoryModel
    .find(filters)
    .populate("category createdBy updatedBy")
    .populate({
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
    .populate("category createdBy updatedBy")
    .populate({
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
    });

  if (!subCategory) {
    throw new ApiError(404, "Subcategory not found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: subCategory });
});

// Update sub category
export const updateSubCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, status, categoryId } = req.body;

  const subCategory = await SubCategoryModel.findById(req.params.id);

  if (!subCategory) {
    throw new ApiError(404, "Subcategory not found");
  };

  if (req.files?.image?.[0]) {
    if (subCategory.image && fs.existsSync(path.join(process.cwd(), subCategory.image))) {
      fs.unlinkSync(path.join(process.cwd(), subCategory.image));
    };
    subCategory.image = await compressImage(req.files.image[0].buffer, "subCategory");
  };

  if (req.files?.icon?.[0]) {
    if (subCategory.icon && fs.existsSync(path.join(process.cwd(), subCategory.icon))) {
      fs.unlinkSync(path.join(process.cwd(), subCategory.icon));
    };
    subCategory.icon = await compressImage(req.files.icon[0].buffer, "subCategory");
  };

  if (name && name !== subCategory.name) {
    await SlugModel.deleteOne({ collectionName: "SubCategory", documentId: subCategory._id });
    const newSlug = await generateUniqueSlug(name, "SubCategory", subCategory._id, "sub-categories");
    subCategory.slug = newSlug;
  };

  subCategory.name = name || subCategory.name;
  subCategory.shortDescription = shortDescription || subCategory.shortDescription;
  subCategory.fullDescription = fullDescription || subCategory.fullDescription;
  subCategory.status = typeof status === "boolean" ? status : subCategory.status;
  subCategory.categoryId = categoryId || subCategory.categoryId;
  subCategory.updatedBy = req.user?._id;

  await subCategory.save();
  return res.status(200).json({ success: true, message: "Updated successfully", data: subCategory });
});

// Create sub category
export const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategoryModel.findById(req.params.id);

  if (!subCategory) {
    throw new ApiError(404, "Subcategory not found");
  };

  if (subCategory.image && fs.existsSync(path.join(process.cwd(), subCategory.image))) {
    fs.unlinkSync(path.join(process.cwd(), subCategory.image));
  };

  if (subCategory.icon && fs.existsSync(path.join(process.cwd(), subCategory.icon))) {
    fs.unlinkSync(path.join(process.cwd(), subCategory.icon));
  };

  await SlugModel.deleteOne({ collectionName: "SubCategory", documentId: subCategory._id });
  await subCategory.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
