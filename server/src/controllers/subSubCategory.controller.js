import SubSubCategoryModel from "../models/subSubCategory.model.js";
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import SlugModel from "../models/slug.model.js";
import ApiError from "../helpers/apiError.js";
import asyncHandler from "../helpers/asyncHandler.js";
import compressImage from "../helpers/compressImage.js";
import { generateUniqueSlug } from "../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";

// Create sub sub category
export const createSubSubCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, categoryId, subCategoryId } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Sub sub category name is required");
  };

  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "category not found");
  };

  const subcategory = await SubCategoryModel.findById(subCategoryId);

  if (!subcategory) {
    throw new ApiError(404, "Sub category not found");
  };

  let imagePath = null;

  try {
    if (req.file) {
      imagePath = await compressImage(req.file.buffer, "subSubCategory");
    };

    const subSubCategory = await SubSubCategoryModel.create({
      name,
      shortDescription,
      fullDescription,
      categoryId,
      subCategoryId,
      createdBy: req.user?._id,
      image: imagePath,
    });

    const slug = await generateUniqueSlug(name, "SubSubCategory", subSubCategory._id, "sub-sub-categories");
    subSubCategory.slug = slug;
    await subSubCategory.save();

    return res.status(201).json({ success: true, data: subSubCategory });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get all sub sub category
export const getSubSubCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "-createdAt", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  if (status !== undefined) filters.status = status === "true";

  const subSubCategories = await SubSubCategoryModel
    .find(filters)
    .populate("category subCategory createdBy updatedBy")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await SubSubCategoryModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: subSubCategories,
  });
});

// Get single sub sub category
export const getSubSubCategoryById = asyncHandler(async (req, res) => {
  const subSubCategory = await SubSubCategoryModel
    .findById(req.params.id)
    .populate("category subCategory createdBy updatedBy");

  if (!subSubCategory) throw new ApiError(404, "Sub sub category not found");

  return res.status(200).json({ success: true, data: subSubCategory });
});

// Update sub sub category
export const updateSubSubCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, status, categoryId, subCategoryId } = req.body;

  const subSubCategory = await SubSubCategoryModel.findById(req.params.id);
  if (!subSubCategory) throw new ApiError(404, "Sub sub category not found");

  if (req.file) {
    if (subSubCategory.image && fs.existsSync(path.join(process.cwd(), subSubCategory.image))) {
      fs.unlinkSync(path.join(process.cwd(), subSubCategory.image));
    };
    subSubCategory.image = await compressImage(req.file.buffer, "subSubCategory");
  };

  if (name && name !== subSubCategory.name) {
    await SlugModel.deleteOne({ collectionName: "SubSubCategory", documentId: subSubCategory?._id });
    const newSlug = await generateUniqueSlug(name, "SubSubCategory", subSubCategory?._id, "sub-sub-categories");
    subSubCategory.slug = newSlug;
  };

  subSubCategory.name = name || subSubCategory.name;
  subSubCategory.shortDescription = shortDescription || subSubCategory.shortDescription;
  subSubCategory.fullDescription = fullDescription || subSubCategory.fullDescription;
  subSubCategory.status = typeof status === "boolean" ? status : subSubCategory.status;
  subSubCategory.categoryId = categoryId || subSubCategory.categoryId;
  subSubCategory.subCategoryId = subCategoryId || subSubCategory.subCategoryId;
  subSubCategory.updatedBy = req.user?._id;

  await subSubCategory.save();

  return res.status(200).json({ success: true, data: subSubCategory });
});

// Delete sub sub category
export const deleteSubSubCategory = asyncHandler(async (req, res) => {
  const subSubCategory = await SubSubCategoryModel.findById(req.params.id);
  if (!subSubCategory) throw new ApiError(404, "Sub sub category not found");

  if (subSubCategory.image && fs.existsSync(path.join(process.cwd(), subSubCategory.image))) {
    fs.unlinkSync(path.join(process.cwd(), subSubCategory.image));
  };

  await SlugModel.deleteOne({ collectionName: "SubSubCategory", documentId: subSubCategory?._id });
  await subSubCategory.deleteOne();

  return res.status(200).json({ success: true, message: "Sub sub category deleted successfully" });
});
