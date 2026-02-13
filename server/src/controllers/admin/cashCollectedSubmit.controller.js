import CashCollectedSubmitModel from "../../models/cashCollectedSubmit.model.js";
import BookingModel from "../../models/booking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

/* ============================
   CREATE
============================ */
export const createCashCollectedSubmit = asyncHandler(async (req, res) => {
  const { bookingId, providerId, amount } = req.body;

  if (!bookingId) {
    throw new ApiError(400, "Booking is required");
  }

  if (!providerId) {
    throw new ApiError(400, "Provider is required");
  }

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Booking amount already collected");
  }

  const booking = await BookingModel.findById(bookingId).select("_id");
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const cashSubmit = await CashCollectedSubmitModel.create({
    bookingId,
    providerId,
    amount,
    createdBy: req.user?._id,
  });

  await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      cashCollectedSubmitAmount: amount,
      cashCollectedPendingAmount: 0,
    },
    { new: true }
  );

  return res.status(201).json({
    success: true,
    message: "Cash submitted successfully",
    data: cashSubmit,
  });
});

/* ============================
   GET ALL
============================ */
export const getCashCollectedSubmitList = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    serviceman,
    bookingId,
    sort = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (serviceman) {
    filters.providerId = serviceman;
  }

  if (bookingId) {
    filters.bookingId = bookingId;
  }

  if (status !== undefined) {
    filters.staus = status === "true";
  }

  if (search) {
    const value = Number(search);
    if (!isNaN(value)) {
      filters.amount = { $gte: value };
    }
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const list = await CashCollectedSubmitModel.find(filters)
    .populate("booking")
    .populate("profile", "name email mobile profileImage")
    .populate("serviceman")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await CashCollectedSubmitModel.countDocuments(filters);
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
    data: list,
    pagination: buildPagination({ page, limit, total }),
  });
});

/* ============================
   GET SINGLE
============================ */
export const getCashCollectedSubmitById = asyncHandler(async (req, res) => {
  const cash = await CashCollectedSubmitModel.findById(req.params.id)
    .populate("booking")
    .populate("profile", "name email mobile profileImage")
    .populate("serviceman");

  if (!cash) {
    throw new ApiError(404, "Cash submit record not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: cash,
  });
});
