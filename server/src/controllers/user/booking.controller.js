import BookingModel from "../../models/Booking.model.js";
import BookingItemModel from "../../models/BookingItem.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Generate Unique Booking Id
const generateBookingId = async () => {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0].replace(/-/g, "");
  const count = await BookingModel.countDocuments({
    createdAt: {
      $gte: new Date(today.setHours(0, 0, 0, 0)),
      $lt: new Date(today.setHours(23, 59, 59, 999)),
    },
  });
  return `BK${dateStr}-${count + 1}`;
};

// Create Booking + Booking Items
export const createBooking = asyncHandler(async (req, res) => {
  const { addressId, scheduleType, scheduleDate, scheduleTime, paymentMode, paymentBy,
    amount, gstAmount, gstPercent, discountAmount, payableAmount, isCouponUsed, items } = req.body;

  if (!items || items.length === 0) throw new ApiError(400, "Booking must include at least 1 service");

  // Booking
  const bookingId = await generateBookingId();

  const booking = await BookingModel.create({
    bookingId,
    userId: req.user._id,
    addressId,
    scheduleType,
    scheduleDate,
    scheduleTime,
    paymentMode,
    paymentBy,
    amount,
    gstAmount,
    gstPercent,
    discountAmount,
    payableAmount,
    isCouponUsed,
  });

  // Booking Items
  const bookingItems = items.map((item) => ({
    bookingId: booking?._id,
    userId: req.user?._id,
    serviceId: item.serviceId,
    quantity: item.quantity,
    mrpPrice: item.mrpPrice,
    salePrice: item.salePrice,
  }));

  await BookingItemModel.insertMany(bookingItems);

  return res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

// Get All Bookings
export const getBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, userId, sort = "desc", } = req.query;

  const filters = {};
  if (userId) filters.userId = userId;

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  const bookings = await BookingModel
    .find(filters)
    .populate("userId", "name email mobile")
    .populate("addressId")
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await BookingModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data: bookings,
  });
});

// Get Booking by ID
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await BookingModel
    .findById(id)
    .populate("userId", "name email mobile")
    .populate("addressId");

  if (!booking) throw new ApiError(404, "Booking not found");

  const items = await BookingItemModel.find({ bookingId: booking._id }).populate("serviceId");

  return res.status(200).json({
    success: true,
    data: { booking, items },
  });
});

//  Update Booking 
export const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await BookingModel.findByIdAndUpdate(id, req.body, { new: true });

  if (!booking) throw new ApiError(404, "Booking not found");

  return res.status(200).json({
    success: true,
    message: "Booking updated successfully",
    data: booking,
  });
});

//  Delete Booking + Booking Items
export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await BookingModel.findById(id);
  if (!booking) throw new ApiError(404, "Booking not found");

  await BookingItemModel.deleteMany({ bookingId: booking._id });
  await BookingModel.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Booking and items deleted successfully",
  });
});
