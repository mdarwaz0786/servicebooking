import ServiceIncludedModel from "../../models/serviceIncluded.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE SERVICE INCLUDED ---------------------
export const createServiceIncluded = asyncHandler(async (req, res) => {
  const { mainTitle, titles } = req.body;

  if (!mainTitle || !mainTitle.trim()) {
    throw new ApiError(400, "Main title is required");
  };

  let titlesArray = [];
  if (titles) {
    titlesArray = typeof titles === "string" ? JSON.parse(titles) : titles;
  };

  const serviceIncluded = await ServiceIncludedModel.create({
    mainTitle,
    titles: titlesArray,
  });

  return res.status(201).json({ success: true, data: serviceIncluded });
});

// --------------------- GET ALL SERVICE INCLUDED ---------------------
export const getServiceIncludedList = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.mainTitle = { $regex: search, $options: "i" };
  };

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const serviceIncludedList = await ServiceIncludedModel.find(filters)
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
  const serviceIncluded = await ServiceIncludedModel.findById(req.params.id).lean();
  if (!serviceIncluded) {
    throw new ApiError(404, "Service included entry not found");
  };
  return res.status(200).json({ success: true, data: serviceIncluded });
});

// --------------------- UPDATE SERVICE INCLUDED ---------------------
export const updateServiceIncluded = asyncHandler(async (req, res) => {
  const { mainTitle } = req.body;

  let existingTitles = []
  if (req.body.existingTitles) {
    try {
      existingTitles =
        typeof req.body.existingTitles === "string"
          ? JSON.parse(req.body.existingTitles)
          : req.body.existingTitles
    } catch (err) {
      throw new ApiError(400, "Invalid existingTitles format")
    };
  };

  const serviceIncluded = await ServiceIncludedModel.findById(req.params.id)
  if (!serviceIncluded) {
    throw new ApiError(404, "Service included entry not found")
  };

  let updatedTitles = [];

  if (existingTitles.length > 0) {
    updatedTitles = serviceIncluded.titles.filter((t) =>
      existingTitles.includes(t)
    );
  };

  if (req.body.titles) {
    const newTitles =
      typeof req.body.titles === "string" ? JSON.parse(req.body.titles) : req.body.titles
    updatedTitles = [...updatedTitles, ...newTitles]
  };

  serviceIncluded.titles = updatedTitles
  serviceIncluded.mainTitle = mainTitle || serviceIncluded.mainTitle

  await serviceIncluded.save()

  return res.status(200).json({
    success: true,
    message: "Service included updated successfully",
    data: serviceIncluded
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
