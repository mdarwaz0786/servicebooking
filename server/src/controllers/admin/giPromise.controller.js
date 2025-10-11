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

  let titlesArray = [];
  if (titles) {
    titlesArray = typeof titles === "string" ? JSON.parse(titles) : titles;
  };

  const giPromise = await GIPromiseModel.create({
    mainTitle,
    titles: titlesArray,
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
  const { mainTitle } = req.body;

  let updatedTitles = [];
  if (req.body.titles) {
    try {
      updatedTitles =
        typeof req.body.titles === "string"
          ? JSON.parse(req.body.titles)
          : req.body.titles;
    } catch (err) {
      throw new ApiError(400, "Invalid titles format");
    };
  };

  const giPromise = await GIPromiseModel.findById(req.params.id);
  if (!giPromise) {
    throw new ApiError(404, "GI Promise not found");
  };

  giPromise.mainTitle = mainTitle || giPromise.mainTitle;

  if (Array.isArray(updatedTitles) && updatedTitles.length > 0) {
    giPromise.titles = updatedTitles;
  };

  await giPromise.save();

  return res.status(200).json({
    success: true,
    message: "GI Promise updated successfully",
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
