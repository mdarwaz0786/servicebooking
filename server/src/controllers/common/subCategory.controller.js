import SubCategoryModel from "../../models/subCategory.model.js";
import CategoryModel from "../../models/category.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";

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

  try {
    if (req.file) {
      imagePath = await compressImage(req.file.buffer, "subcategory");
    };

    const subCategory = await SubCategoryModel.create({
      name,
      shortDescription,
      fullDescription,
      categoryId,
      createdBy: req.user?._id,
      image: imagePath,
    });

    const slug = await generateUniqueSlug(name, "SubCategory", subCategory._id, "sub-categories");
    subCategory.slug = slug;
    await subCategory.save();

    return res.status(201).json({ success: true, data: subCategory });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get all sub category
export const getSubCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "-createdAt", page = 1, limit = 10 } = req.query;

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

  const subCategories = await SubCategoryModel
    .find(filters)
    .populate("category createdBy updatedBy")
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await SubCategoryModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: subCategories,
  });
});

// get single sub category
export const getSubCategoryById = asyncHandler(async (req, res) => {
  const subCategory = await SubCategoryModel
    .findById(req.params.id)
    .populate("category createdBy updatedBy")

  if (!subCategory) {
    throw new ApiError(404, "Subcategory not found");
  };

  return res.status(200).json({ success: true, data: subCategory });
});

// Update sub category
export const updateSubCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, status, categoryId } = req.body;

  const subCategory = await SubCategoryModel.findById(req.params.id);

  if (!subCategory) {
    throw new ApiError(404, "Subcategory not found");
  };

  if (req.file) {
    if (subCategory.image && fs.existsSync(path.join(process.cwd(), subCategory.image))) {
      fs.unlinkSync(path.join(process.cwd(), subCategory.image));
    };
    subCategory.image = await compressImage(req.file.buffer, "subcategory");
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
  return res.status(200).json({ success: true, data: subCategory });
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

  await SlugModel.deleteOne({ collectionName: "SubCategory", documentId: subCategory._id });
  await subCategory.deleteOne();

  return res.status(200).json({ success: true, message: "Subcategory deleted successfully" });
});
