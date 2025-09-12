import BookingModel from "../../models/Booking.model.js";
import BookingItemModel from "../../models/BookingItem.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import {getCartData} from "../../utils/cart.utils.js";

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
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized: User not found");

  const {
    addressId,
    scheduleType,
    scheduleDate,
    scheduleTime,
    paymentMode,
    paymentBy,
    isCouponUsed } = req.body;

  // Get cart data from utility
  const { cartProducts, amountData } = await getCartData(userId);

  if (!cartProducts.length) throw new ApiError(400, "Cart is empty");

  // Generate bookingId
  const bookingId = await generateBookingId();

  // Create Booking
  const booking = await BookingModel.create({
    bookingId,
    userId,
    addressId,
    scheduleType,
    scheduleDate,
    scheduleTime,
    paymentMode,
    paymentBy,
    amount: amountData.amount,
    gstAmount: amountData.gstAmount,
    gstPercent: amountData.gstPercent,
    discountAmount: amountData.discountAmount,
    payableAmount: amountData.payableAmount,
    isCouponUsed,
  });

  // Prepare Booking Items from cartProducts
  const bookingItems = cartProducts.map(item => ({
    bookingId: booking._id,
    userId,
    serviceId: item.serviceId,
    quantity: item.quantity,
    mrpPrice: item.mrpPrice || 0,
    salePrice: item.salePrice || 0,
  }));

  // Insert Booking Items
  await BookingItemModel.insertMany(bookingItems);

  // Clear User Cart
  // await CartModel.deleteMany({ userId });

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
