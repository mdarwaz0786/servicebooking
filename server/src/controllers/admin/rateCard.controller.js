import RateCardModel from "../../models/rateCard.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// ======================== CREATE RATE CARD ========================
export const createRateCard = asyncHandler(async (req, res) => {
  const { services, rateGroups, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  if (!services || !Array.isArray(services) || services.length === 0) {
    throw new ApiError(400, "At least one service is required");
  }

  if (!rateGroups || !Array.isArray(rateGroups) || rateGroups.length === 0) {
    throw new ApiError(400, "Rate groups are required");
  }

  const rateCard = await RateCardModel.create({
    services,
    rateGroups,
    createdBy: req.user?._id,
    category,
    subCategory,
    subSubCategory,
    subSubSubCategory
  });

  return res.status(201).json({
    success: true,
    message: "Rate card created successfully",
    data: rateCard,
  });
});

// ======================== GET ALL RATE CARDS ========================
export const getRateCards = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page = 1,
    limit = 10,
    category,
    subCategory,
    subSubCategory,
    subSubSubCategory
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { "rateGroups.title": { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (category) filters.category = category;
  if (subCategory) filters.subCategory = subCategory;
  if (subSubCategory) filters.subSubCategory = subSubCategory;
  if (subSubSubCategory) filters.subSubSubCategory = subSubSubCategory;

  const sortOption =
    sort === "asc"
      ? { createdAt: 1 }
      : sort === "desc"
        ? { createdAt: -1 }
        : {};

  const total = await RateCardModel.countDocuments(filters);

  const rateCards = await RateCardModel.find(filters)
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Rate cards fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: rateCards,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ======================== GET SINGLE RATE CARD ========================
export const getRateCardById = asyncHandler(async (req, res) => {
  const rateCard = await RateCardModel.findById(req.params.id)
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .lean();

  if (!rateCard) {
    throw new ApiError(404, "Rate card not found");
  }

  return res.status(200).json({
    success: true,
    data: rateCard,
  });
});

// ======================== UPDATE RATE CARD ========================
export const updateRateCard = asyncHandler(async (req, res) => {
  const { services, rateGroups, status, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  const rateCard = await RateCardModel.findById(req.params.id);
  if (!rateCard) {
    throw new ApiError(404, "Rate card not found");
  }

  if (services && Array.isArray(services) && services.length > 0) {
    rateCard.services = services;
  }

  if (rateGroups && Array.isArray(rateGroups) && rateGroups.length > 0) {
    rateCard.rateGroups = rateGroups;
  }

  if (typeof status === "boolean") {
    rateCard.status = status;
  }

  rateCard.updatedBy = req.user?._id;

  rateCard.category = category || rateCard?.category;
  rateCard.subCategory = subCategory || rateCard?.subCategory;
  rateCard.subSubCategory = subSubCategory || rateCard?.subSubCategory;
  rateCard.subSubSubCategory = subSubSubCategory || rateCard?.subSubSubCategory;

  await rateCard.save();

  return res.status(200).json({
    success: true,
    message: "Rate card updated successfully",
    data: rateCard,
  });
});

// ======================== DELETE RATE CARD ========================
export const deleteRateCard = asyncHandler(async (req, res) => {
  const rateCard = await RateCardModel.findById(req.params.id);

  if (!rateCard) {
    throw new ApiError(404, "Rate card not found");
  }

  await rateCard.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Rate card deleted successfully",
  });
});
