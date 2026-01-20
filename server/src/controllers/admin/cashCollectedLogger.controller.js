import CashCollectedLoggerModel from "../../models/cashCollectedLogger.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// create
export const createCashCollected = asyncHandler(async (req, res) => {
  const { bookingId, providerId, amount } = req.body;

  if (!bookingId) {
    throw new ApiError(400, "Booking is required");
  }

  if (!providerId) {
    throw new ApiError(400, "Provider is required");
  }

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Valid amount is required");
  }

  const cash = await CashCollectedLoggerModel.create({
    bookingId,
    providerId,
    amount,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: cash,
  });
});

// get all
export const getCashCollectedList = asyncHandler(async (req, res) => {
  let { search, status, providerId, sort = "desc", page = 1, limit = 10 } =
    req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (providerId) {
    filters.providerId = providerId;
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (search) {
    const value = Number(search);
    if (!isNaN(value)) {
      filters.amount = { $gte: value };
    }
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const cashList = await CashCollectedLoggerModel
    .find(filters)
    .populate("booking")
    .populate("profile", "name email mobile profileImage")
    .populate("serviceman")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await CashCollectedLoggerModel.countDocuments(filters);
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
    data: cashList,
    pagination: buildPagination({ page, limit, total }),
  });
});

// get single
export const getCashCollectedById = asyncHandler(async (req, res) => {
  const cash = await CashCollectedLoggerModel.findById(req.params.id)
    .populate("booking")
    .populate("profile", "name email mobile profileImage")
    .populate("serviceman")

  if (!cash) {
    throw new ApiError(404, "Cash entry not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: cash,
  });
});
