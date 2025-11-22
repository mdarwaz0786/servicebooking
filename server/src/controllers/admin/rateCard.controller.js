import RateCardModel from "../../models/rateCard.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// ======================== CREATE RATE CARD ========================
export const createRateCard = asyncHandler(async (req, res) => {
  const { rateGroups, category, subCategory } = req.body;

  if (!rateGroups || !Array.isArray(rateGroups) || rateGroups.length === 0) {
    throw new ApiError(400, "Rate groups are required");
  }

  const rateCard = await RateCardModel.create({
    category,
    subCategory,
    rateGroups,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
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

  const sortOption =
    sort === "asc"
      ? { createdAt: 1 }
      : sort === "desc"
        ? { createdAt: -1 }
        : {};

  const total = await RateCardModel.countDocuments(filters);

  const rateCards = await RateCardModel
    .find(filters)
    .populate("category")
    .populate("subCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

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
    data: rateCards,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ======================== GET SINGLE RATE CARD ========================
export const getRateCardById = asyncHandler(async (req, res) => {
  const rateCard = await RateCardModel.findById(req.params.id)
    .populate("category")
    .populate("subCategory")
    .lean();

  if (!rateCard) {
    throw new ApiError(404, "Rate card not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: rateCard,
  });
});

// ======================== UPDATE RATE CARD ========================
export const updateRateCard = asyncHandler(async (req, res) => {
  const { rateGroups, status, category, subCategory } = req.body;

  const rateCard = await RateCardModel.findById(req.params.id);
  if (!rateCard) {
    throw new ApiError(404, "Rate card not found");
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

  await rateCard.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
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
    message: "Deleted successfully",
  });
});
