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
import { adjustWalletCredit } from "../../utils/wallet.utils.js";
import rejectAdditionalParts from "../../utils/rejectAdditionalPart.js";
import BookingMediaModel from "../../models/bookingMedia.model.js";
import mongoose from "mongoose";

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
  let { page = 1, limit = 10, userId, sort = "desc", search, status, bookingStatus } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (userId) filters.userId = userId;

  if (status) {
    if (status === "active") {
      filters.status = { $in: ["new", "assign", "accept", "ongoing", "reject", "partstatusnew", "partstatusconfirm", "partstatusapprove", "partstatusreject"] };
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

  if (bookingStatus) {
    filters.status = bookingStatus;
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
    .populate("additionalParts")
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
// export const getBookingById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const booking = await BookingModel
//     .findById(id)
//     .populate({ path: "user", select: "-password" })
//     .populate({ path: "address", select: "" })
//     .lean();

//   if (!booking) throw new ApiError(404, "Booking not found");

//   const latestAssignment = await ServiceManBookingModel
//     .findOne({ bookingId: booking?._id })
//     .sort({ createdAt: -1 })
//     .lean();

//   if (latestAssignment) {
//     const servicemanId = latestAssignment?.servicemanId;
//     const serviceman = await ServiceManProfile
//       .findOne({ userId: servicemanId })
//       .populate("user")
//       .lean();

//     booking.serviceman = serviceman
//       ? {
//         name: serviceman?.name,
//         email: serviceman?.email,
//         mobile: serviceman?.user?.mobile,
//         profileImage: serviceman?.profileImage,
//       }
//       : null;
//   } else {
//     booking.serviceman = null;
//   };

//   const items = await BookingItemModel
//     .find({ bookingId: booking?._id })
//     .populate({ path: "service", select: "" })
//     .lean();

//   return res.status(200).json({
//     success: true,
//     data: {
//       booking: booking,
//       items: items,
//     },
//   });
// });

// Get Booking by ID (Latest + All Serviceman Assignments)
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  /* ---------------- BOOKING ---------------- */
  const booking = await BookingModel
    .findById(id)
    .populate({ path: "user", select: "-password -role" })
    .populate({ path: "address", select: "" })
    .populate({
      path: "additionalParts",
      populate: [
        {
          path: "serviceItemId",
          populate: {
            path: "service",
            select: "name"
          }
        },
        {
          path: "brandId",
          select: "name code image"
        }
      ]
    })
    .lean();

  if (!booking) throw new ApiError(404, "Booking not found");

  const medias = await BookingMediaModel
    .find({ bookingId: booking?._id })
    .lean();

  const mediaMap = {};

  for (const m of medias) {
    const key = String(m.servicemanBookingId);

    if (!mediaMap[key]) {
      mediaMap[key] = {
        beforeStartImages: [],
        beforeStartVideos: [],
        afterCompleteImages: [],
        afterCompleteVideos: [],
      };
    }

    if (m.mediaTimeline === 1 && m.mediaType === "image") {
      mediaMap[key].beforeStartImages.push(m.media);
    }

    if (m.mediaTimeline === 1 && m.mediaType === "video") {
      mediaMap[key].beforeStartVideos.push(m.media);
    }

    if (m.mediaTimeline === 2 && m.mediaType === "image") {
      mediaMap[key].afterCompleteImages.push(m.media);
    }

    if (m.mediaTimeline === 2 && m.mediaType === "video") {
      mediaMap[key].afterCompleteVideos.push(m.media);
    }
  }

  /* ---------------- ALL ASSIGNMENTS ---------------- */
  const assignments = await ServiceManBookingModel
    .find({ bookingId: booking?._id })
    .sort({ createdAt: -1 })
    .populate({
      path: "servicemanId",
      populate: {
        path: "user",
        select: "-password -role",
      },
    })
    .populate("actionById")
    .lean();

  /* ---------------- LATEST ASSIGNMENT ---------------- */
  const latestAssign = assignments[0] || null;

  const latestMedia = latestAssign
    ? mediaMap[String(latestAssign?._id)] || {
      beforeStartImages: [],
      beforeStartVideos: [],
      afterCompleteImages: [],
      afterCompleteVideos: [],
    }
    : null;
  booking.latestServiceman = latestAssign
    ? {
      assignmentId: latestAssign?._id,
      status: latestAssign?.status,
      assignedDate: latestAssign?.assignedDate,
      assignedTime: latestAssign?.assignedTime,
      startDate: latestAssign?.startDate,
      startTime: latestAssign?.startTime,
      endDate: latestAssign?.endDate,
      endTime: latestAssign?.endTime,
      cancelDate: latestAssign?.cancelDate,
      cancelTime: latestAssign?.cancelTime,
      acceptDate: latestAssign?.acceptDate,
      acceptTime: latestAssign?.acceptTime,
      rejectDate: latestAssign?.rejectDate,
      rejectTime: latestAssign?.rejectTime,
      selfie: latestAssign?.selfie,

      beforeStartImages: latestMedia?.beforeStartImages,
      beforeStartVideos: latestMedia?.beforeStartVideos,
      afterCompleteImages: latestMedia?.afterCompleteImages,
      afterCompleteVideos: latestMedia?.afterCompleteVideos,

      serviceman: latestAssign?.servicemanId
        ? {
          profileId: latestAssign?.servicemanId?._id,
          name: latestAssign?.servicemanId?.name,
          email: latestAssign?.servicemanId?.email,
          mobile: latestAssign?.servicemanId?.user?.mobile,
          profileImage: latestAssign?.servicemanId?.profileImage,
        }
        : null,
    }
    : null;

  /* ---------------- SERVICEMAN HISTORY ---------------- */
  booking.servicemanHistory = assignments?.slice(1)?.map((assign) => {
    const historyMedia =
      mediaMap[String(assign?._id)] || {
        beforeStartImages: [],
        beforeStartVideos: [],
        afterCompleteImages: [],
        afterCompleteVideos: [],
      };

    return {
      assignmentId: assign?._id,
      status: assign?.status,
      assignedDate: assign?.assignedDate,
      assignedTime: assign?.assignedTime,
      startDate: assign?.startDate,
      startTime: assign?.startTime,
      endDate: assign?.endDate,
      endTime: assign?.endTime,
      cancelDate: assign?.cancelDate,
      cancelTime: assign?.cancelTime,
      acceptDate: assign?.acceptDate,
      acceptTime: assign?.acceptTime,
      rejectDate: assign?.rejectDate,
      rejectTime: assign?.rejectTime,
      selfie: assign?.selfie,

      beforeStartImages: historyMedia?.beforeStartImages,
      beforeStartVideos: historyMedia?.beforeStartVideos,
      afterCompleteImages: historyMedia?.afterCompleteImages,
      afterCompleteVideos: historyMedia?.afterCompleteVideos,

      serviceman: assign?.servicemanId
        ? {
          profileId: assign?.servicemanId?._id,
          name: assign?.servicemanId?.name,
          email: assign?.servicemanId?.email,
          mobile: assign?.servicemanId?.user?.mobile,
          profileImage: assign?.servicemanId?.profileImage,
        }
        : null,
    };
  });

  /* ---------------- BOOKING ITEMS ---------------- */
  const items = await BookingItemModel
    .find({ bookingId: booking._id })
    .populate({ path: "service", select: "-shortDescription -fullDescription" })
    .populate({
      path: "additionalParts",
      populate: [
        {
          path: "brandId",
          model: "Brand",
        },
        {
          path: "rateId",
          model: "RateCard",
        }
      ]
    })
    .lean();

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: {
      booking,
      items,
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

  if (req.body.status) {
    const lastServicemanBooking = await ServiceManBookingModel.findOne({
      bookingId: booking?._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (lastServicemanBooking) {
      await ServiceManBookingModel.findByIdAndUpdate(
        lastServicemanBooking?._id,
        {
          status: req.body.status,
          updatedBy: req.user?._id,
        },
      );
    };

    const latestServiceman = await ServiceManProfile.findById(lastServicemanBooking?.servicemanId);

    if (req.body.status == "cancel") {
      await adjustWalletCredit(latestServiceman?.userId, req.body.status, lastServicemanBooking?.bookingId);
    };
  };

  if (req.body.status == "partstatusreject") {
    await rejectAdditionalParts(booking?._id);
  };

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

// Filter provider booking
export const getProviderBookings = async (req, res) => {
  try {
    const { servicemanId } = req.query;

    const matchStage = {
      status: "complete",
    };

    if (servicemanId) {
      if (!mongoose.Types.ObjectId.isValid(servicemanId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid servicemanId",
        });
      };

      matchStage.servicemanId = new mongoose.Types.ObjectId(servicemanId);
    };

    const bookings = await ServiceManBookingModel.aggregate([
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookingId",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: "$booking" },

      {
        $project: {
          _id: 0,
          bookingId: "$booking._id",
          bookingCode: "$booking.bookingId",
          status: "$booking.status",
          cashColletedPendingAmount: "$booking.cashColletedPendingAmount"
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
