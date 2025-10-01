import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ReviewModel from "../../models/review.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { getCartData } from "../../utils/cart.utils.js";
import CartModel from "../../models/cart.model.js";
import { buildPagination } from "../../utils/pagination.js";
import generateBookingId from "../../utils/generateBookingId.js";

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

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
    otp: "1234",
    createdBy: userId,
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
  await CartModel.deleteMany({ userId });

  return res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: { booking: booking, items: cartProducts, amountData: amountData },
  });
});

// Get All Bookings
export const getBookings = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, sort = "desc", search } = req.query;

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized: Please login to view your bookings");
  };

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  filters.userId = userId;

  if (userId) filters.userId = userId;

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
    .populate({
      path: "bookingItems",
      strictPopulate: false,
      populate: {
        path: "service",
        select: "name image",
        strictPopulate: false,
      },
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  for (let booking of bookings) {
    const latestAssignment = await ServiceManBookingModel
      .findOne({ bookingId: booking._id })
      .sort({ createdAt: -1 })
      .lean();

    if (latestAssignment) {
      const serviceman = await ServiceManProfileModel
        .findOne({ _id: latestAssignment.servicemanId })
        .populate("user", "mobile")
        .lean();

      booking.serviceman = serviceman
        ? {
          name: serviceman?.name,
          email: serviceman?.email,
          mobile: serviceman?.user?.mobile || null,
          profileImage: serviceman?.profileImage,
        }
        : null;
    } else {
      booking.serviceman = null;
    };

    const review = await ReviewModel.findOne({
      bookingId: booking?._id,
      userId: userId,
    })
      .populate({
        path: "servicemanId",
        select: "name email profileImage userId",
        populate: { path: "userId", select: "mobile" },
      })
      .lean();

    if (review) {
      booking.review = {
        rating: review?.rating,
        description: review?.description,
        serviceman: review?.servicemanId
          ? {
            name: review?.servicemanId?.name,
            email: review?.servicemanId?.email,
            profileImage: review?.servicemanId?.profileImage,
            mobile: review?.servicemanId?.userId?.mobile || null,
          }
          : null,
      };
    } else {
      booking.review = null;
    };
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

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized: Please login to view your bookings");
  };

  const booking = await BookingModel
    .findOne({ _id: id, userId: userId })
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
    const serviceman = await ServiceManProfileModel
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

  const review = await ReviewModel.findOne({
    bookingId: booking?._id,
    userId,
  })
    .populate({
      path: "servicemanId",
      select: "name email profileImage userId",
      populate: { path: "userId", select: "mobile" },
    })
    .lean();

  booking.review = review
    ? {
      rating: review?.rating,
      description: review?.description,
      serviceman: review?.servicemanId
        ? {
          name: review?.servicemanId?.name,
          email: review?.servicemanId?.email,
          profileImage: review?.servicemanId?.profileImage,
          mobile: review?.servicemanId?.userId?.mobile || null,
        }
        : null,
    }
    : null;

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
