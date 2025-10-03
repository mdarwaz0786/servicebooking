import HomePageServiceModel from "../../models/homePageService.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Create
export const createHomePageService = asyncHandler(async (req, res) => {
  const { services, title, status } = req.body;
  const userId = req.user?._id;

  if (!services || !services.length) throw new ApiError(400, "At least one Service ID is required");
  if (!title) throw new ApiError(400, "Title is required");

  const newService = await HomePageServiceModel.create({
    services,
    title,
    status: status !== undefined ? status : true,
    createdBy: userId,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: newService });
});


// Get all
export const getHomePageServices = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 10 } = req.query;

  const filters = {};
  if (status !== undefined) filters.status = status === "true";
  if (search) filters.title = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  const services = await HomePageServiceModel.find(filters)
    .populate("services", "name image")
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .lean();

  const total = await HomePageServiceModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
    data: services,
  });
});

// Get single
export const getHomePageServiceById = asyncHandler(async (req, res) => {
  const service = await HomePageServiceModel.findById(req.params.id)
    .populate("services", "name image")
    .lean();

  if (!service) throw new ApiError(404, "Home Page Service not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: service });
});

// Update
export const updateHomePageService = asyncHandler(async (req, res) => {
  const { services = [], title, status } = req.body;
  const userId = req.user?._id;

  const service = await HomePageServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Home Page Service not found");

  service.services = services;

  if (title) service.title = title;
  if (status !== undefined) service.status = status;
  service.updatedBy = userId;

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
