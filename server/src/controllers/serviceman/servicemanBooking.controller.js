import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import BookingModel from "../../models/booking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Get All Bookings
export const getServiceManBookings = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  };

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  filters.servicemanId = userId;

  if (search) {
    filters.$or = [
      { status: { $regex: search, $options: "i" } },
    ];
  };

  if (status) {
    filters.status = status;
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
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  };

  const booking = await ServiceManBookingModel
    .findOne({ _id: req.params.id, userId: userId })
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

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Generate OTP Booking
export const serviceManBookingOtp = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const servicemanBooking = await ServiceManBookingModel.findOne({ _id: req.params.id, userId });
  if (!servicemanBooking) throw new ApiError(404, "Serviceman booking not found");

  const otp = generateOtp();
  const booking = await BookingModel.findById(servicemanBooking.bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.otp = "1234";

  await booking.save();

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
    data: {
      booking: booking,
      servicemanBooking: servicemanBooking,
      otp,
      status,
    },
  });
});

// Verify OTP Booking
export const serviceManBookingVerifyOtp = asyncHandler(async (req, res) => {
  const { otp, status, startDate, startTime, endDate, endTime } = req.body;
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const servicemanBooking = await ServiceManBookingModel.findOne({ _id: req.params.id, userId });
  if (!servicemanBooking) throw new ApiError(404, "Serviceman booking not found");

  const booking = await BookingModel.findById(servicemanBooking.bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  if (otp !== booking.otp) throw new ApiError(400, "Invalid OTP");

  booking.status = status || booking.status;
  servicemanBooking.status = status || servicemanBooking.status;

  if (status === "ongoing") {
    if (!startDate || !startTime) {
      throw new ApiError(400, "Start date and start time are required when status is ongoing");
    };
    servicemanBooking.startDate = startDate;
    servicemanBooking.startTime = startTime;
  };

  if (status === "complete") {
    if (!endDate || !endTime) {
      throw new ApiError(400, "End date and end time are required when status is complete");
    };
    servicemanBooking.endDate = endDate;
    servicemanBooking.endTime = endTime;
  };

  servicemanBooking.updatedBy = userId;

  await booking.save();
  await servicemanBooking.save();

  return res.status(200).json({
    success: true,
    message: "OTP verified & status updated successfully",
    data: {
      booking,
      servicemanBooking: servicemanBooking,
    },
  });
});

