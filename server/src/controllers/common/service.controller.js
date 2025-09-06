import ServiceModel from "../../models/service.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";

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

  try {
    if (req.file) {
      imagePath = await compressImage(req.file.buffer, "service");
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
    });

    const slug = await generateUniqueSlug(name, "Service", service._id, "services");
    service.slug = slug;
    await service.save();

    return res.status(201).json({ success: true, data: service });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get all services
export const getServices = asyncHandler(async (req, res) => {
  let { search, status, sort = "-createdAt", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  if (status !== undefined) filters.status = status === "true";

  const services = await ServiceModel
    .find(filters)
    .populate("createdBy updatedBy")
    .populate({
      path: "categoryId",
      options: { strictPopulate: false },
      populate: {
        path: "subcategories",
        options: { strictPopulate: false },
        populate: {
          path: "subSubCategories",
          options: { strictPopulate: false },
          populate: {
            path: "subSubSubCategories",
            options: { strictPopulate: false },
          },
        },
      },
    })
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await ServiceModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: services,
  });
});

// Get single service
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id)
    .populate("createdBy updatedBy")
    .populate({
      path: "categoryId",
      options: { strictPopulate: false },
      populate: {
        path: "subcategories",
        options: { strictPopulate: false },
        populate: {
          path: "subSubCategories",
          options: { strictPopulate: false },
          populate: {
            path: "subSubSubCategories",
            options: { strictPopulate: false },
          },
        },
      },
    });

  if (!service) throw new ApiError(404, "Service not found");
  return res.status(200).json({ success: true, data: service });
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

  if (req.file) {
    if (service.image && fs.existsSync(path.join(process.cwd(), service.image))) {
      fs.unlinkSync(path.join(process.cwd(), service.image));
    };
    service.image = await compressImage(req.file.buffer, "service");
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
  return res.status(200).json({ success: true, data: service });
});

// Delete service
export const deleteService = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");

  if (service.image && fs.existsSync(path.join(process.cwd(), service.image))) {
    fs.unlinkSync(path.join(process.cwd(), service.image));
  };

  await SlugModel.deleteOne({ collectionName: "Service", documentId: service._id });
  await service.deleteOne();

  return res.status(200).json({ success: true, message: "Service deleted successfully" });
});
