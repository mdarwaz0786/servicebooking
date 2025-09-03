import CategoryModel from "../models/category.model.js";
import ApiError from "../helpers/apiError.js";
import asyncHandler from "../helpers/asyncHandler.js";
import compressImage from "../helpers/compressImage.js";
import fs from "fs";

// Create Category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription } = req.body;

  let imagePath = null;
  if (req.file) {
    imagePath = await compressImage(req.file.buffer, "category");
  };

  const category = await CategoryModel.create({
    name,
    shortDescription,
    fullDescription,
    createdBy: req.user._id,
    image: imagePath,
  });

  return res.status(201).json({ success: true, category });
});

// Get All Categories
export const getCategories = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "-createdAt",
    page = 1,
    limit = 10
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const searchConditions = {};
  if (search) {
    searchConditions.$or = [
      { name: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
      { fullDescription: { $regex: search, $options: "i" } },
    ];
  };

  if (status !== undefined) {
    searchConditions.status = status === "true";
  };

  const categories = await CategoryModel
    .find(searchConditions)
    .populate("createdBy updatedBy", "name email mobile role")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await CategoryModel.countDocuments(searchConditions);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: categories,
  });
});

// Get Single Category
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoryModel
    .findById(req.params.id)
    .populate("createdBy updatedBy", "name email mobile role");

  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  return res.status(200).json({ success: true, category });
});

//  Update Category
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, status } = req.body;

  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  if (req.file) {
    if (category.image && fs.existsSync(category.image)) {
      fs.unlinkSync(category.image);
    };
    category.image = await compressImage(req.file.buffer, "category");
  };

  category.name = name || category.name;
  category.shortDescription = shortDescription || category.shortDescription;
  category.fullDescription = fullDescription || category.fullDescription;
  category.status = typeof status === "boolean" ? status : category.status;
  category.updatedBy = req.user?._id;

  await category.save();

  return res.status(200).json({ success: true, category });
});

//  Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  if (category.image && fs.existsSync(category.image)) {
    fs.unlinkSync(category.image);
  };

  await category.deleteOne();

  return res.status(200).json({ success: true, message: "Category deleted successfully" });
});
