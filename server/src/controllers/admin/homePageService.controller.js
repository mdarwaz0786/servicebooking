import HomePageServiceModel from "../../models/homePageService.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Create
export const createHomePageService = asyncHandler(async (req, res) => {
  const { services, title, category, subCategory, subSubCategory, subSubSubCategory } = req.body;
  const userId = req.user?._id;

  if (!services || !services.length) throw new ApiError(400, "At least one Service ID is required");
  if (!title) throw new ApiError(400, "Title is required");

  const newService = await HomePageServiceModel.create({
    title,
    category,
    subCategory,
    subSubCategory,
    subSubSubCategory,
    services,
    createdBy: userId,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: newService });
});

// Get all
export const getHomePageServices = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 10, category, services, subCategory, subSubCategory, subSubSubCategory } = req.query;

  const filters = {};
  if (status !== undefined) filters.status = status === "true";
  if (search) filters.title = { $regex: search, $options: "i" };
  if (category) filters.category = category;
  if (subCategory) filters.subCategory = subCategory;
  if (subSubCategory) filters.subSubCategory = subSubCategory;
  if (subSubSubCategory) filters.subSubSubCategory = subSubSubCategory;
  if (services) filters.services = services;

  const skip = (page - 1) * limit;

  const service = await HomePageServiceModel.find(filters)
    .populate("services", "name image icon")
    .populate("category", "name image icon")
    .populate("subCategory", "name image icon")
    .populate("subSubCategory", "name image icon")
    .populate("subSubSubCategory", "name image icon")
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .lean();

  const total = await HomePageServiceModel.countDocuments(filters);
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
    data: service,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get single
export const getHomePageServiceById = asyncHandler(async (req, res) => {
  const service = await HomePageServiceModel
    .findById(req.params.id)
    .populate("services", "name image icon")
    .populate("category", "name image icon")
    .populate("subCategory", "name image icon")
    .populate("subSubCategory", "name image icon")
    .populate("subSubSubCategory", "name image icon")
    .lean();

  if (!service) throw new ApiError(404, "Home Page Service not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: service });
});

// Update
export const updateHomePageService = asyncHandler(async (req, res) => {
  const { services, category, subCategory, subSubCategory, subSubSubCategory, title, status } = req.body;
  const userId = req.user?._id;

  const service = await HomePageServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Home Page Service not found");

  if (services) service.services = services;
  service.category = category || service?.category;
  service.subCategory = subCategory || service?.subCategory;
  service.subSubCategory = subSubCategory || service?.subSubCategory;
  service.subSubSubCategory = subSubSubCategory || service?.subSubSubCategory;

  if (title) service.title = title;
  if (status !== undefined) service.status = status;
  service.updatedBy = userId;
  service.updatedAt = new Date();

  await service.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: service });
});

// Delete
export const deleteHomePageService = asyncHandler(async (req, res) => {
  const service = await HomePageServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Home Page Service not found");

  await service.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
