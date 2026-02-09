import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import BookingModel from "../../models/booking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import getCurrentIndianTime from "../../utils/getCurrentIndianTime.js";
import { adjustWalletCredit, ensureSufficientCredit } from "../../utils/wallet.utils.js";
import sendNotification from "../../utils/sendNotification.js";

// Create Service Man Booking
export const createServiceManBooking = asyncHandler(async (req, res) => {
  const {
    bookingId,
    servicemanId,
    userId,
    getAll,
  } = req.body;

  if (!bookingId || !servicemanId || !userId) {
    throw new ApiError(400, "Required fields are missing.");
  };

  const booking = await BookingModel.findById(bookingId);

  if (!booking) {
    throw new ApiError(400, "Booking not found");
  }

  const serviceman = await ServiceManProfileModel.findOne({ _id: servicemanId }).select("userId zones").lean();

  if (!serviceman) {
    throw new ApiError(400, "Serviceman not found");
  }

  if (!serviceman?.zones) {
    throw new ApiError(400, "Assign zone to this provider");
  }

  const isSufficient = await ensureSufficientCredit(serviceman?.userId, bookingId);

  if (!isSufficient) {
    throw new ApiError(403, "Insufficient credit points");
  }

  const latestAssignment = await ServiceManBookingModel
    .findOne({ bookingId: bookingId })
    .sort({ createdAt: -1 });

  if (latestAssignment) {
    await ServiceManBookingModel.findByIdAndUpdate(latestAssignment?._id, {
      status: "cancel",
      actionById: req.user?._id,
      updatedBy: req.user?._id,
      cancelDate: new Date(),
      cancelTime: getCurrentIndianTime(),
    });

    await BookingModel.findByIdAndUpdate(bookingId, {
      $set: {
        status: "new",
        actionById: req.user?._id,
        updatedBy: req.user?._id,
      },
    });
  };

  const newAssignment = await ServiceManBookingModel.create({
    bookingId,
    servicemanId,
    userId,
    createdBy: req.user?._id,
  });

  const type = getAll === false ? "bookingSameZone" : "bookingOtherZone";
  const title = getAll === false ? "Booking Accepted" : "New Booking";
  const message = getAll === false ? "One booking is accepted to you kindly proceed furthur" : "You have received a new booking kindly accept it if you can serve it";

  if (serviceman?.userId) {
    await sendNotification(
      [serviceman?.userId],
      title,
      message,
      "serviceman",
      {
        type: type,
      }
    );
  };

  return res.status(201).json({
    success: true,
    message: latestAssignment
      ? "Service re-assigned successfully"
      : "Service assigned successfully",
    data: newAssignment,
  });
});

// Get All Bookings
export const getServiceManBookings = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10, bookingId, servicemanId, userId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (userId) {
    filters.userId = userId;
  };

  if (bookingId) {
    filters.bookingId = bookingId;
  };

  if (servicemanId) {
    filters.servicemanId = servicemanId;
  };

  if (servicemanId) {
    filters.servicemanId = servicemanId;
  };

  if (status) {
    filters.status = status;
  };

  if (search) {
    filters.$or = [
      { status: { $regex: search, $options: "i" } },
    ];
  };

  let sortOption = {};

  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else {
    sortOption = { createdAt: -1 };
  };

  let bookings = await ServiceManBookingModel
    .find(filters)
    .populate("booking serviceman user")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ServiceManBookingModel.countDocuments(filters);
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
    data: bookings,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single Booking by ID
export const getServiceManBookingById = asyncHandler(async (req, res) => {
  const booking = await ServiceManBookingModel
    .findById(req.params.id)
    .populate("booking serviceman user")

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: booking,
  });
});
