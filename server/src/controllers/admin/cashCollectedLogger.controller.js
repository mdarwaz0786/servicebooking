import CashCollectedLoggerModel from "../../models/cashCollectedLogger.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import BookingModel from "../../models/booking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// create
export const createCashCollected = asyncHandler(async (req, res) => {
  const { bookingId, providerId, amount } = req.body;

  if (!bookingId) {
    throw new ApiError(400, "Booking is required");
  };

  const existingBooking = await BookingModel
    .findById(bookingId)
    .select("_id payableAmount paymentStatus cashColletedAmount cashColletedPendingAmount cashColletedSubmitAmount");

  if (!existingBooking) {
    throw new ApiError(404, "Booking not found");
  };

  if (!providerId) {
    throw new ApiError(400, "Provider is required");
  };

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Valid amount is required");
  };

  const cash = await CashCollectedLoggerModel.create({
    bookingId,
    providerId,
    amount,
    createdBy: req.user?._id,
  });

  await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      paymentStatus: 1,
      cashColletedSubmitAmount: amount,
      cashColletedAmount: existingBooking?.cashColletedAmount + amount,
      cashColletedPendingAmount: existingBooking?.payableAmount - (existingBooking?.cashColletedAmount + amount),
    },
    { new: true },
  );

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

// update
export const updateCashCollected = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  if (!id) {
    throw new ApiError(400, "Cash record id is required");
  }

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Valid amount is required");
  }

  const cashLog = await CashCollectedLoggerModel.findById(id);

  if (!cashLog) {
    throw new ApiError(404, "Cash record not found");
  }

  // Get previous total before this entry
  const previousLog = await CashCollectedLoggerModel.findOne(
    {
      providerId: cashLog.providerId,
      createdAt: { $lt: cashLog.createdAt },
    },
    { totalCashCollected: 1 },
    { sort: { createdAt: -1 } }
  );

  const previousTotal = previousLog?.totalCashCollected || 0;

  // Recalculate running total
  cashLog.amount = amount;
  cashLog.totalCashCollected = previousTotal + amount;
  cashLog.updatedBy = req.user?._id;

  await cashLog.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: cashLog,
  });
});

// Filter provider booking
export const getProviderBookingsByPaymentMode = async (req, res) => {
  try {
    const { servicemanId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(servicemanId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid servicemanId",
      });
    }

    const bookings = await ServiceManBookingModel.aggregate([
      {
        $match: {
          servicemanId: new mongoose.Types.ObjectId(servicemanId),
        },
      },

      // Join Booking
      {
        $lookup: {
          from: "bookings",
          localField: "bookingId",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: "$booking" },

      // Filter by payment mode
      {
        $match: {
          "booking.paymentMode": "cod",
        },
      },

      // Final response
      {
        $project: {
          _id: 0,
          bookingId: "$booking._id",
          bookingCode: "$booking.bookingId",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
      message: "Server error",
    });
  }
};

