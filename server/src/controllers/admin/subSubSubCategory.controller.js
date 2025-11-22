import SubSubSubCategoryModel from "../../models/subSubSubCategory.model.js";
import CategoryModel from "../../models/category.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import SubSubCategoryModel from "../../models/subSubCategory.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create sub sub sub category
export const createSubSubSubCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, categoryId, subCategoryId, subSubCategoryId } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Sun sub sub category name is required");
  };

  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "category not found");
  };

  const subcategory = await SubCategoryModel.findById(subCategoryId);

  if (!subcategory) {
    throw new ApiError(404, "Sub category not found");
  };

  const subsubcategory = await SubSubCategoryModel.findById(subSubCategoryId);

  if (!subsubcategory) {
    throw new ApiError(404, "Sub sub category not found");
  };

  let imagePath = null;
  let iconPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "subSubSubCategory");
    };

    if (req.files?.icon?.[0]) {
      iconPath = await compressImage(req.files.icon[0].buffer, "subSubSubCategory");
    };

    const subSubSubCategory = await SubSubSubCategoryModel.create({
      name,
      shortDescription,
      fullDescription,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      createdBy: req.user?._id,
      image: imagePath,
      icon: iconPath,
    });

    const slug = await generateUniqueSlug(name, "SubSubSubCategory", subSubSubCategory._id, "sub-sub-sub-categories");
    subSubSubCategory.slug = slug;
    await subSubSubCategory.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: subSubSubCategory });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    if (iconPath && fs.existsSync(path.join(process.cwd(), iconPath))) {
      fs.unlinkSync(path.join(process.cwd(), iconPath));
    };
    if (error.code === 11000) {
      throw new ApiError(409, "Nested service process already exisyts");
    }
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

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
    .populate("category subCategory subSubCategory createdBy updatedBy")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const total = await SubSubSubCategoryModel.countDocuments(filters);
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

// Get single sub sub sub category
export const getSubSubSubCategoryById = asyncHandler(async (req, res) => {
  const subSubSubCategory = await SubSubSubCategoryModel
    .findById(req.params.id)
    .populate("category subCategory subSubCategory createdBy updatedBy");

  if (!subSubSubCategory) {
    throw new ApiError(404, "Sub sub sub category not found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: subSubSubCategory });
});

// Update sub sub sub category
export const updateSubSubSubCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, status, categoryId, subCategoryId, subSubCategoryId } = req.body;

  const subSubSubCategory = await SubSubSubCategoryModel.findById(req.params.id);
  if (!subSubSubCategory) {
    throw new ApiError(404, "Sub sub sub category not found");
  };

  if (req.files?.image?.[0]) {
    if (subSubSubCategory.image && fs.existsSync(path.join(process.cwd(), subSubSubCategory.image))) {
      fs.unlinkSync(path.join(process.cwd(), subSubSubCategory.image));
    };
    subSubSubCategory.image = await compressImage(req.files.image[0].buffer, "subSubSubCategory");
  };

  if (req.files?.icon?.[0]) {
    if (subSubSubCategory.icon && fs.existsSync(path.join(process.cwd(), subSubSubCategory.icon))) {
      fs.unlinkSync(path.join(process.cwd(), subSubSubCategory.icon));
    };
    subSubSubCategory.icon = await compressImage(req.files.icon[0].buffer, "subSubSubCategory");
  };

  if (name && name !== subSubSubCategory.name) {
    await SlugModel.deleteOne({ collectionName: "SubSubSubCategory", documentId: subSubSubCategory._id });
    const newSlug = await generateUniqueSlug(name, "SubSubSubCategory", subSubSubCategory._id, "sub-sub-sub-categories");
    subSubSubCategory.slug = newSlug;
  };

  subSubSubCategory.name = name || subSubSubCategory.name;
  subSubSubCategory.shortDescription = shortDescription || subSubSubCategory.shortDescription;
  subSubSubCategory.fullDescription = fullDescription || subSubSubCategory.fullDescription;
  subSubSubCategory.status = typeof status === "boolean" ? status : subSubSubCategory.status;
  subSubSubCategory.categoryId = categoryId || subSubSubCategory.categoryId;
  subSubSubCategory.subCategoryId = subCategoryId || subSubSubCategory.subCategoryId;
  subSubSubCategory.subSubCategoryId = subSubCategoryId || subSubSubCategory.subSubCategoryId;
  subSubSubCategory.updatedBy = req.user?._id;

  await subSubSubCategory.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: subSubSubCategory });
});

// Delete sub sub sub category
export const deleteSubSubSubCategory = asyncHandler(async (req, res) => {
  const subSubSubCategory = await SubSubSubCategoryModel.findById(req.params.id);
  if (!subSubSubCategory) {
    throw new ApiError(404, "Sub-sub-subcategory not found");
  };

  if (subSubSubCategory.image && fs.existsSync(path.join(process.cwd(), subSubSubCategory.image))) {
    fs.unlinkSync(path.join(process.cwd(), subSubSubCategory.image));
  };

  if (subSubSubCategory.icon && fs.existsSync(path.join(process.cwd(), subSubSubCategory.icon))) {
    fs.unlinkSync(path.join(process.cwd(), subSubSubCategory.icon));
  };

  await SlugModel.deleteOne({ collectionName: "SubSubSubCategory", documentId: subSubSubCategory._id });
  await subSubSubCategory.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
