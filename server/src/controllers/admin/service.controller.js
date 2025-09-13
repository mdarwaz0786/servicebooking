import ServiceModel from "../../models/service.model.js";
import CategoryModel from "../../models/category.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import SubSubCategoryModel from "../../models/subSubCategory.model.js";
import SubSubSubCategoryModel from "../../models/subSubSubCategory.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create service
export const createService = asyncHandler(async (req, res) => {
  const {
    name,
    mrpPrice,
    salePrice,
    timeTaking,
    shortDescription,
    fullDescription,
    categoryId,
    subCategoryId,
    subSubCategoryId,
    subSubSubCategoryId
  } = req.body;

  if (!name || !name.trim()) throw new ApiError(400, "Service name is required");
  if (!categoryId) throw new ApiError(400, "Category is required");

  let imagePath = null;
  let iconPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "service");
    };

    if (req.files?.icon?.[0]) {
      iconPath = await compressImage(req.files.icon[0].buffer, "service");
    };

    const service = await ServiceModel.create({
      name,
      mrpPrice,
      salePrice,
      timeTaking,
      shortDescription,
      fullDescription,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      subSubSubCategoryId,
      createdBy: req.user?._id,
      image: imagePath,
      icon: iconPath,
    });

    const slug = await generateUniqueSlug(name, "Service", service._id, "services");
    service.slug = slug;
    await service.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: service });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    if (iconPath && fs.existsSync(path.join(process.cwd(), iconPath))) {
      fs.unlinkSync(path.join(process.cwd(), iconPath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get all services
export const getServices = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10, slug, categoryId, subCategoryId, subSubCategoryId, subSubSubCategoryId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  if (status !== undefined) filters.status = status === "true";

  if (categoryId) {
    filters.categoryId = categoryId;
  };

  if (subCategoryId) {
    filters.subCategoryId = subCategoryId;
  };

  if (subSubCategoryId) {
    filters.subSubCategoryId = subSubCategoryId;
  };

  if (subSubSubCategoryId) {
    filters.subSubSubCategoryId = subSubSubCategoryId;
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  let data, name, categoryList;

  if (slug) {
    const slugData = await SlugModel.findOne({ slug });

    if (!slugData) {
      return res.status(404).json({
        success: false,
        message: `No resource found for slug: ${slug}`,
      });
    };

    if (slugData.collectionName === "Category") {
      filters.categoryId = slugData.documentId;
      data = await CategoryModel.findById(slugData.documentId);
      categoryList = await SubCategoryModel.find({ categoryId: data._id });
      name = data.name;
    } else if (slugData.collectionName === "SubCategory") {
      filters.subCategoryId = slugData.documentId;
      data = await SubCategoryModel.findById(slugData.documentId);
      categoryList = await SubSubCategoryModel.find({ subCategoryId: data._id });
      name = data.name;
    } else if (slugData.collectionName === "SubSubCategory") {
      filters.subSubCategoryId = slugData.documentId;
      data = await SubSubCategoryModel.findById(slugData.documentId);
      categoryList = await SubSubSubCategoryModel.find({ subSubCategoryId: data._id });
      name = data.name;
    } else if (slugData.collectionName === "SubSubSubCategory") {
      filters.subSubSubCategoryId = slugData.documentId;
      data = await SubSubSubCategoryModel.findById(slugData.documentId);
      name = data.name;
    } else if (slugData.collectionName === "Service") {
      filters._id = slugData.documentId;
      data = await ServiceModel.findById(slugData.documentId);
      name = data.name;
    };
  };

  const services = await ServiceModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const total = await ServiceModel.countDocuments(filters);
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
    slug,
    name,
    categoryList: categoryList,
    data: services,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get single service
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");
  return res.status(200).json({ success: true, message: "Data fetched successfully", data: service });
});

// Update service
export const updateService = asyncHandler(async (req, res) => {
  const {
    name,
    mrpPrice,
    salePrice,
    timeTaking,
    shortDescription,
    fullDescription,
    status,
    categoryId,
    subCategoryId,
    subSubCategoryId,
    subSubSubCategoryId
  } = req.body;

  const service = await ServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");

  if (req.files?.image?.[0]) {
    if (service.image && fs.existsSync(path.join(process.cwd(), service.image))) {
      fs.unlinkSync(path.join(process.cwd(), service.image));
    };
    service.image = await compressImage(req.files.image[0].buffer, "service");
  };

  if (req.files?.icon?.[0]) {
    if (service.icon && fs.existsSync(path.join(process.cwd(), service.icon))) {
      fs.unlinkSync(path.join(process.cwd(), service.icon));
    };
    service.icon = await compressImage(req.files.icon[0].buffer, "service");
  };

  if (name && name !== service.name) {
    await SlugModel.deleteOne({ collectionName: "Service", documentId: service._id });
    const newSlug = await generateUniqueSlug(name, "Service", service._id, "services");
    service.slug = newSlug;
  };

  service.name = name || service.name;
  service.mrpPrice = mrpPrice !== undefined ? mrpPrice : service.mrpPrice;
  service.salePrice = salePrice !== undefined ? salePrice : service.salePrice;
  service.timeTaking = timeTaking || service.timeTaking;
  service.shortDescription = shortDescription || service.shortDescription;
  service.fullDescription = fullDescription || service.fullDescription;
  service.status = typeof status === "boolean" ? status : service.status;
  service.categoryId = categoryId || service.categoryId;
  service.subCategoryId = subCategoryId || service.subCategoryId;
  service.subSubCategoryId = subSubCategoryId || service.subSubCategoryId;
  service.subSubSubCategoryId = subSubSubCategoryId || service.subSubSubCategoryId;
  service.updatedBy = req.user?._id;

  await service.save();
  return res.status(200).json({ success: true, message: "Updated successfully", data: service });
});

// Delete service
export const deleteService = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");

  if (service.image && fs.existsSync(path.join(process.cwd(), service.image))) {
    fs.unlinkSync(path.join(process.cwd(), service.image));
  };

  if (service.icon && fs.existsSync(path.join(process.cwd(), service.icon))) {
    fs.unlinkSync(path.join(process.cwd(), service.icon));
  };

  await SlugModel.deleteOne({ collectionName: "Service", documentId: service._id });
  await service.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
