import SubSubCategoryModel from "../../models/subSubCategory.model.js";
import CategoryModel from "../../models/category.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

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
  let iconPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "subSubCategory");
    };

    if (req.files?.icon?.[0]) {
      iconPath = await compressImage(req.files.icon[0].buffer, "subSubCategory");
    };

    const subSubCategory = await SubSubCategoryModel.create({
      name,
      shortDescription,
      fullDescription,
      categoryId,
      subCategoryId,
      createdBy: req.user?._id,
      image: imagePath,
      icon: iconPath,
    });

    const slug = await generateUniqueSlug(name, "SubSubCategory", subSubCategory._id, "sub-sub-categories");
    subSubCategory.slug = slug;
    await subSubCategory.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: subSubCategory });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    if (iconPath && fs.existsSync(path.join(process.cwd(), iconPath))) {
      fs.unlinkSync(path.join(process.cwd(), iconPath));
    };
    if (error.code === 11000) {
      throw new ApiError(409, "Service process already exists");
    }
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

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
    .populate("category subCategory createdBy updatedBy")
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
    message: "Data fetched successfully",
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
    .populate("category subCategory createdBy updatedBy")
    .populate({
      path: "subSubSubCategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
    });

  if (!subSubCategory) throw new ApiError(404, "Sub sub category not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: subSubCategory });
});

// Update sub sub category
export const updateSubSubCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, status, categoryId, subCategoryId, slug } = req.body;

  const subSubCategory = await SubSubCategoryModel.findById(req.params.id);
  if (!subSubCategory) throw new ApiError(404, "Sub sub category not found");

  if (req.files?.image?.[0]) {
    if (subSubCategory.image && fs.existsSync(path.join(process.cwd(), subSubCategory.image))) {
      fs.unlinkSync(path.join(process.cwd(), subSubCategory.image));
    };
    subSubCategory.image = await compressImage(req.files.image[0].buffer, "subSubCategory");
  };

  if (req.files?.icon?.[0]) {
    if (subSubCategory.icon && fs.existsSync(path.join(process.cwd(), subSubCategory.icon))) {
      fs.unlinkSync(path.join(process.cwd(), subSubCategory.icon));
    };
    subSubCategory.icon = await compressImage(req.files.icon[0].buffer, "subSubCategory");
  };

  if (slug && slug !== subSubCategory.slug) {
    await SlugModel.deleteOne({
      collectionName: "SubSubCategory",
      documentId: subSubCategory?._id,
    });

    const newSlug = await generateUniqueSlug(
      slug,
      "SubSubCategory",
      subSubCategory?._id,
      "sub-sub-categories"
    );

    subSubCategory.slug = newSlug;
  } else if (name && name !== subSubCategory?.name) {
    await SlugModel.deleteOne({
      collectionName: "SubSubCategory",
      documentId: subSubCategory?._id,
    });

    const newSlug = await generateUniqueSlug(
      name,
      "SubSubCategory",
      subSubCategory?._id,
      "sub-sub-categories"
    );

    subSubCategory.slug = newSlug;
  };

  subSubCategory.name = name || subSubCategory.name;
  subSubCategory.shortDescription = shortDescription || subSubCategory.shortDescription;
  subSubCategory.fullDescription = fullDescription || subSubCategory.fullDescription;
  subSubCategory.status = typeof status === "boolean" ? status : subSubCategory.status;
  subSubCategory.categoryId = categoryId || subSubCategory.categoryId;
  subSubCategory.subCategoryId = subCategoryId || subSubCategory.subCategoryId;
  subSubCategory.updatedBy = req.user?._id;
  subSubCategory.updatedAt = new Date();

  await subSubCategory.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: subSubCategory });
});

// Delete sub sub category
export const deleteSubSubCategory = asyncHandler(async (req, res) => {
  const subSubCategory = await SubSubCategoryModel.findById(req.params.id);
  if (!subSubCategory) throw new ApiError(404, "Sub sub category not found");

  if (subSubCategory.image && fs.existsSync(path.join(process.cwd(), subSubCategory.image))) {
    fs.unlinkSync(path.join(process.cwd(), subSubCategory.image));
  };

  if (subSubCategory.icon && fs.existsSync(path.join(process.cwd(), subSubCategory.icon))) {
    fs.unlinkSync(path.join(process.cwd(), subSubCategory.icon));
  };

  await SlugModel.deleteOne({ collectionName: "SubSubCategory", documentId: subSubCategory?._id });
  await subSubCategory.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully", message: "Sub sub category deleted successfully" });
});
