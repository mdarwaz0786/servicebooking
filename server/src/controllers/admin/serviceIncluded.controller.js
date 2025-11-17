import ServiceIncludedModel from "../../models/serviceIncluded.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE SERVICE INCLUDED ---------------------
export const createServiceIncluded = asyncHandler(async (req, res) => {
  const { mainTitle, titles, services, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  if (!mainTitle) {
    throw new ApiError(400, "Main title is required");
  };

  const serviceIncluded = await ServiceIncludedModel.create({
    mainTitle,
    services,
    titles,
    category,
    subCategory,
    subSubCategory,
    subSubSubCategory
  });

  return res.status(201).json({ success: true, data: serviceIncluded });
});

// --------------------- GET ALL SERVICE INCLUDED ---------------------
export const getServiceIncludedList = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc", category, subCategory, subSubCategory, subSubSubCategory } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.mainTitle = { $regex: search, $options: "i" };
  };

  if (category) filters.category = category;
  if (subCategory) filters.subCategory = subCategory;
  if (subSubCategory) filters.subSubCategory = subSubCategory;
  if (subSubSubCategory) filters.subSubSubCategory = subSubSubCategory;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const serviceIncludedList = await ServiceIncludedModel
    .find(filters)
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ServiceIncludedModel.countDocuments(filters);
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
    data: serviceIncludedList,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE SERVICE INCLUDED ---------------------
export const getServiceIncludedById = asyncHandler(async (req, res) => {
  const serviceIncluded = await ServiceIncludedModel
    .findById(req.params.id)
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .lean();

  if (!serviceIncluded) {
    throw new ApiError(404, "Service included entry not found");
  };

  return res.status(200).json({ success: true, data: serviceIncluded });
});

// --------------------- UPDATE SERVICE INCLUDED ---------------------
export const updateServiceIncluded = asyncHandler(async (req, res) => {
  const { mainTitle, status, titles, services, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  const serviceIncluded = await ServiceIncludedModel.findById(req.params.id);
  if (!serviceIncluded) {
    throw new ApiError(404, "Service included not found");
  };

  let updatedTitles = serviceIncluded?.titles || [];
  if (titles !== undefined) {
    let parsedTitles = titles;
    if (!Array.isArray(parsedTitles)) {
      throw new ApiError(400, "titles must be an array");
    };
    updatedTitles = parsedTitles;
  };

  let updatedServices = serviceIncluded?.services || [];
  if (services !== undefined) {
    let parsedServices = services;
    if (!Array.isArray(parsedServices)) {
      throw new ApiError(400, "services must be an array");
    };
    updatedServices = parsedServices;
  };

  serviceIncluded.mainTitle = mainTitle || serviceIncluded?.mainTitle;
  if (typeof status === "boolean") {
    serviceIncluded.status = status;
  };
  serviceIncluded.titles = updatedTitles;
  serviceIncluded.services = updatedServices;
  serviceIncluded.category = category || serviceIncluded?.category;
  serviceIncluded.subCategory = subCategory || serviceIncluded?.subCategory;
  serviceIncluded.subSubCategory = subSubCategory || serviceIncluded?.subSubCategory;
  serviceIncluded.subSubSubCategory = subSubSubCategory || serviceIncluded?.subSubSubCategory;
  serviceIncluded.updatedAt = new Date();

  await serviceIncluded.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: serviceIncluded,
  });
});

// --------------------- DELETE SERVICE INCLUDED ---------------------
export const deleteServiceIncluded = asyncHandler(async (req, res) => {
  const serviceIncluded = await ServiceIncludedModel.findById(req.params.id);
  if (!serviceIncluded) {
    throw new ApiError(404, "Service included entry not found");
  };

  await serviceIncluded.deleteOne();

  return res.status(200).json({ success: true, message: "Service included entry deleted successfully" });
});
