import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Create Service Man Booking
export const createServiceManBooking = asyncHandler(async (req, res) => {
  const {
    bookingId,
    servicemanId,
    userId
  } = req.body;

  if (!bookingId || !servicemanId || !userId) {
    throw new ApiError(400, "Required fields are missing");
  };

  const booking = await ServiceManBookingModel.create({
    bookingId,
    servicemanId,
    userId,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Service man booking created successfully",
    data: booking,
  });
});

// Get All Bookings
export const getServiceManBookings = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { assignedTime: { $regex: search, $options: "i" } },
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

// Update Booking
export const updateServiceManBooking = asyncHandler(async (req, res) => {
  const {
    assignedDate,
    assignedTime,
    status,
    startDate,
    startTime,
    endDate,
    endTime,
  } = req.body;

  const booking = await ServiceManBookingModel.findById(req.params.id);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  };

  booking.assignedDate = assignedDate || booking.assignedDate;
  booking.assignedTime = assignedTime || booking.assignedTime;
  booking.status = status || booking.status;
  booking.startDate = startDate || booking.startDate;
  booking.startTime = startTime || booking.startTime;
  booking.endDate = endDate || booking.endDate;
  booking.endTime = endTime || booking.endTime;
  booking.updatedBy = req.user?._id;

  await booking.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: booking,
  });
});

// Delete Booking
export const deleteServiceManBooking = asyncHandler(async (req, res) => {
  const booking = await ServiceManBookingModel.findById(req.params.id);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  };

  await booking.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
