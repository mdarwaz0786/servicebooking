import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ServiceManProfile from "../../models/servicemanProfile.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { getCartData } from "../../utils/cart.utils.js";
import CartModel from "../../models/cart.model.js";
import { buildPagination } from "../../utils/pagination.js";
import generateBookingId from "../../utils/generateBookingId.js";

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
    createdBy: userId,
  });

  // Prepare Booking Items from cartProducts
  const bookingItems = cartProducts.map((item) => ({
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
  await CartModel.deleteMany({ userId });

  return res.status(201).json({
    success: true,
    message: "Booking Created successfully",
    data: { booking: booking, items: cartProducts, amountData: amountData },
  });
});

// Get All Bookings
export const getBookings = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, userId, sort = "desc", search, status } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (userId) filters.userId = userId;

  if (status) {
    if (status === "active") {
      filters.status = { $in: ["new", "assign", "accept", "ongoing", "reject"] };
    }
    else if (status === "completed") {
      filters.status = "complete";
    }
    else if (status === "cancelled") {
      filters.status = "cancel";
    }
    else {
      filters.status = status;
    }
  };

  if (search) {
    filters.$or = [
      { bookingId: { $regex: search, $options: "i" } },
    ];
  };

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
    .populate({ path: "user", select: "-password" })
    .populate("address")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  for (let booking of bookings) {
    const latestAssignment = await ServiceManBookingModel
      .findOne({ bookingId: booking?._id })
      .sort({ createdAt: -1 })
      .lean();

    const servicemanId = latestAssignment?.servicemanId;
    const serviceman = await ServiceManProfile.findOne({ _id: servicemanId }).populate("user");

    const servicemanDetail = {
      name: serviceman?.name,
      email: serviceman?.email,
      mobile: serviceman?.user?.mobile,
      profileImage: serviceman?.profileImage,
    };

    booking.serviceman = servicemanDetail;
  };

  const total = await BookingModel.countDocuments(filters);
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

// Get Booking by ID
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await BookingModel
    .findById(id)
    .populate({ path: "user", select: "-password" })
    .populate({ path: "address", select: "" })
    .lean();

  if (!booking) throw new ApiError(404, "Booking not found");

  const latestAssignment = await ServiceManBookingModel
    .findOne({ bookingId: booking?._id })
    .sort({ createdAt: -1 })
    .lean();

  if (latestAssignment) {
    const servicemanId = latestAssignment?.servicemanId;
    const serviceman = await ServiceManProfile
      .findOne({ userId: servicemanId })
      .populate("user")
      .lean();

    booking.serviceman = serviceman
      ? {
        name: serviceman?.name,
        email: serviceman?.email,
        mobile: serviceman?.user?.mobile,
        profileImage: serviceman?.profileImage,
      }
      : null;
  } else {
    booking.serviceman = null;
  };

  const items = await BookingItemModel
    .find({ bookingId: booking?._id })
    .populate({ path: "service", select: "" })
    .lean();

  return res.status(200).json({
    success: true,
    data: {
      booking: booking,
      items: items,
    },
  });
});

// Update Booking
export const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
  };

  const updateData = {
    ...req.body,
    updatedBy: req.user?._id,
  };

  const booking = await BookingModel.findByIdAndUpdate(id, updateData, { new: true });

  if (!booking) throw new ApiError(404, "Booking not found");

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: booking,
  });
});

//  Delete Booking + Booking Items
export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await BookingModel.findById(id);
  if (!booking) throw new ApiError(404, "Booking not found");

  await BookingItemModel.deleteMany({ bookingId: booking?._id });
  await BookingModel.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
