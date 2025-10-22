import GIPromiseModel from "../../models/giPromise.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE GI PROMISE ---------------------
export const createGIPromise = asyncHandler(async (req, res) => {
  const { mainTitle, titles, services } = req.body;

  if (!mainTitle) {
    throw new ApiError(400, "Main title is required");
  };

  const giPromise = await GIPromiseModel.create({
    mainTitle,
    titles,
    services,
  });

  return res.status(201).json({ success: true, data: giPromise });
});

// --------------------- GET ALL GI PROMISES ---------------------
export const getGIPromises = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.mainTitle = { $regex: search, $options: "i" };
  };

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const giPromises = await GIPromiseModel.find(filters)
    .populate("services")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await GIPromiseModel.countDocuments(filters);
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
    data: giPromises,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE GI PROMISE ---------------------
export const getGIPromiseById = asyncHandler(async (req, res) => {
  const giPromise = await GIPromiseModel.findById(req.params.id).populate("services").lean();
  if (!giPromise) {
    throw new ApiError(404, "GI Promise not found");
  };
  return res.status(200).json({ success: true, data: giPromise });
});

// --------------------- UPDATE GI PROMISE ---------------------
export const updateGIPromise = asyncHandler(async (req, res) => {
  const { mainTitle, status, titles, services } = req.body;

  const giPromise = await GIPromiseModel.findById(req.params.id);
  if (!giPromise) {
    throw new ApiError(404, "GI Promise not found");
  };

  let updatedTitles = giPromise?.titles || [];
  if (titles !== undefined) {
    let parsedTitles = titles;
    if (!Array.isArray(parsedTitles)) {
      throw new ApiError(400, "titles must be an array");
    };
    updatedTitles = parsedTitles;
  };

  let updatedServices = giPromise?.services || [];
  if (services !== undefined) {
    let parsedServices = services;
    if (!Array.isArray(parsedServices)) {
      throw new ApiError(400, "services must be an array");
    };
    updatedServices = parsedServices;
  };

  giPromise.mainTitle = mainTitle || giPromise?.mainTitle;
  if (typeof status === "boolean") {
    giPromise.status = status;
  };
  giPromise.titles = updatedTitles;
  giPromise.services = updatedServices;
  giPromise.updatedAt = new Date();

  await giPromise.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: giPromise,
  });
});

// --------------------- DELETE GI PROMISE ---------------------
export const deleteGIPromise = asyncHandler(async (req, res) => {
  const giPromise = await GIPromiseModel.findById(req.params.id);
  if (!giPromise) {
    throw new ApiError(404, "GI Promise not found");
  };

  await giPromise.deleteOne();

  return res.status(200).json({ success: true, message: "GI Promise deleted successfully" });
});
