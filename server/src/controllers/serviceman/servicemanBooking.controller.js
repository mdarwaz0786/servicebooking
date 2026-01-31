import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import BookingAdditionalPartModel from "../../models/BookingAdditionalPart.model.js";
import BookingModel from "../../models/booking.model.js";
import ReviewModel from "../../models/review.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import CashCollectedLoggerModel from "../../models/cashCollectedLogger.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import getCurrentIndianTime from "../../utils/getCurrentIndianTime.js";
import compressImage from '../../helpers/compressImage.js';
import { adjustWalletCredit, createServicemanEarning, ensureSufficientCredit } from "../../utils/wallet.utils.js";
import generateOtp from "../../utils/generateOpt.js";
import InvoiceModel from "../../models/invoice.model.js";
import { createInvoice } from "../../utils/invoice.js";

// Get All Bookings
export const getServiceManBookings = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "User not found");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  filters.servicemanId = serviceman?._id;

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
    .populate("serviceman user")
    .populate({
      path: "booking",
      select: "-otp",
      populate: [
        {
          path: "addressId",
          model: "Address",
          strictPopulate: false,
        },
        {
          path: "bookingItems",
          strictPopulate: false,
          populate: {
            path: "service",
            model: "Service",
            select: "name image",
            strictPopulate: false,
          },
        },
      ],
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  for (let b of bookings) {
    const review = await ReviewModel
      .findOne({
        bookingId: b?.booking?._id, type: 1
      })
      .populate({
        path: "userId",
        select: "mobile",
      })
      .lean();

    b.review = review
      ? {
        rating: review?.rating,
        description: review?.description,
        user: review?.userId
          ? {
            _id: review?.userId?._id,
            mobile: review?.userId?.mobile,
          }
          : null,
      }
      : null;
  };

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
// export const getServiceManBookingById = asyncHandler(async (req, res) => {
//   const userId = req.user?._id;

//   if (!userId) throw new ApiError(401, "User not found");

//   const serviceman = await ServiceManProfileModel.findOne({ userId });
//   if (!serviceman) throw new ApiError(404, "Service man profile not found");

//   const booking = await ServiceManBookingModel
//     .findOne({ _id: req.params.id, servicemanId: serviceman?._id })
//     .populate("serviceman user")
//     .populate("bookingId")
//     .populate("servicemanId")
//     .populate("userId")

//   if (!booking) {
//     throw new ApiError(404, "Booking not found");
//   };

//   const review = await ReviewModel.findOne({
//     bookingId: booking.bookingId?._id, type: 1
//   })
//     .populate({
//       path: "userId",
//       select: "mobile",
//     })
//     .lean();

//   console.log(review);

//   booking.review = review
//     ? {
//       rating: review.rating,
//       description: review.description,
//       user: review.userId
//         ? {
//           _id: review.userId._id,
//           mobile: review.userId.mobile,
//           role: review.userId.role,
//         }
//         : null,
//     }
//     : null;

//   return res.status(200).json({
//     success: true,
//     message: "Data fetched successfully",
//     data: booking,
//   });
// });

export const getServiceManBookingById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "User not found");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const booking = await ServiceManBookingModel
    .findOne({
      _id: req.params.id,
      servicemanId: serviceman?._id,
    })
    .populate("serviceman user")
    .populate({
      path: "booking",
      select: "-otp",
      populate: [
        {
          path: "addressId",
          model: "Address",
          strictPopulate: false,
        },
        {
          path: "bookingItems",
          strictPopulate: false,
          populate: {
            path: "service",
            model: "Service",
            select: "name image categoryId subCategoryId",
            strictPopulate: false,
          },
        },
      ],
    })
    .lean();

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const additionalParts = await BookingAdditionalPartModel.find({
    bookingId: booking?.booking?._id,
    status: true,
  })
    .populate("rateId")
    .lean();

  // attach as `parts`
  booking.parts = additionalParts;

  // 🔹 SAME review logic as getAll
  const review = await ReviewModel.findOne({
    bookingId: booking?.booking?._id,
    type: 1,
  })
    .populate({
      path: "userId",
      select: "mobile",
    })
    .lean();

  booking.review = review
    ? {
      rating: review?.rating,
      description: review?.description,
      user: review?.userId
        ? {
          _id: review?.userId?._id,
          mobile: review?.userId?.mobile,
        }
        : null,
    }
    : null;

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: booking,
  });
});

// Generate OTP Booking
export const serviceManBookingOtp = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not found");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const servicemanBooking = await ServiceManBookingModel.findOne({ _id: req.params.id, servicemanId: serviceman?._id });
  if (!servicemanBooking) throw new ApiError(404, "Serviceman booking not found");

  const otp = generateOtp();
  const booking = await BookingModel.findById(servicemanBooking?.bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.otp = otp;

  await booking.save();

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
    data: {
      otp,
      status,
      servicemanBooking: servicemanBooking
    },
  });
});

// Verify OTP Booking
export const serviceManBookingVerifyOtp = asyncHandler(async (req, res) => {
  const { otp, status } = req.body;

  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not found");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const servicemanBooking = await ServiceManBookingModel.findOne({ _id: req.params.id, servicemanId: serviceman?._id });
  if (!servicemanBooking) throw new ApiError(404, "Serviceman booking not found");

  const booking = await BookingModel.findById(servicemanBooking?.bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  if (status != 'accept')
    if (otp !== booking.otp) throw new ApiError(400, "Invalid OTP");

  booking.status = status || booking?.status;
  servicemanBooking.status = status || servicemanBooking?.status;

  const nowDate = new Date();
  const nowTime = getCurrentIndianTime();

  switch (status) {
    case "accept":
      servicemanBooking.acceptDate = nowDate;
      servicemanBooking.acceptTime = nowTime;
      break;

    case "reject":
      servicemanBooking.rejectDate = nowDate;
      servicemanBooking.rejectTime = nowTime;
      break;

    case "cancel":
      servicemanBooking.cancelDate = nowDate;
      servicemanBooking.cancelTime = nowTime;
      break;

    case "ongoing":
      if (!servicemanBooking.startDate) servicemanBooking.startDate = nowDate;
      if (!servicemanBooking.startTime) servicemanBooking.startTime = nowTime;
      break;

    case "complete":
      if (!servicemanBooking.endDate) servicemanBooking.endDate = nowDate;
      if (!servicemanBooking.endTime) servicemanBooking.endTime = nowTime;
      break;
  };

  servicemanBooking.updatedBy = userId;
  servicemanBooking.actionById = userId;
  booking.actionById = userId;

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

// Accept Booking
export const serviceManBookingAccept = asyncHandler(async (req, res) => {
  let status = 'accept';

  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not found");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const servicemanBooking = await ServiceManBookingModel.findOne({ _id: req.params.id, servicemanId: serviceman?._id });
  if (!servicemanBooking) throw new ApiError(404, "Serviceman booking not found");

  const alreadyAccepted = await ServiceManBookingModel.findOne({
    bookingId: servicemanBooking?.bookingId,
    status: "accept",
  });

  if (alreadyAccepted) {
    return res.status(400).json({
      success: false,
      message: "Booking has already been accepted by another serviceman",
    });
  };

  await ensureSufficientCredit(userId, servicemanBooking?.bookingId);

  const booking = await BookingModel.findById(servicemanBooking?.bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.status = status || booking?.status;
  servicemanBooking.status = status || servicemanBooking?.status;

  const nowDate = new Date();
  const nowTime = getCurrentIndianTime();

  servicemanBooking.acceptDate = nowDate;
  servicemanBooking.acceptTime = nowTime;

  servicemanBooking.updatedBy = userId;
  servicemanBooking.actionById = userId;
  booking.actionById = userId;

  await ServiceManBookingModel.updateMany(
    {
      bookingId: booking?._id,
      _id: { $ne: servicemanBooking?._id },
      status: "new",
    },
    { $set: { status: "reject" } },
  );

  await booking.save();
  await servicemanBooking.save();

  await adjustWalletCredit(userId, status, servicemanBooking?.bookingId)

  return res.status(200).json({
    success: true,
    message: "Booking Accepted successfully",
    data: {
      booking,
      servicemanBooking: servicemanBooking,
    },
  });
});

// Complete Booking
// export const serviceManBookingComplete = asyncHandler(async (req, res) => {
//   // const { status } = req.body;
//   let status = 'complete';

//   const userId = req.user?._id;
//   if (!userId) throw new ApiError(401, "User not found");

//   const serviceman = await ServiceManProfileModel.findOne({ userId });
//   if (!serviceman) throw new ApiError(404, "Service man profile not found");

//   const servicemanBooking = await ServiceManBookingModel.findOne({ _id: req.params.id, servicemanId: serviceman?._id });
//   if (!servicemanBooking) throw new ApiError(404, "Serviceman booking not found");

//   const booking = await BookingModel.findById(servicemanBooking?.bookingId);
//   if (!booking) throw new ApiError(404, "Booking not found");

//   booking.status = status || booking?.status;
//   servicemanBooking.status = status || servicemanBooking?.status;

//   const nowDate = new Date();
//   const nowTime = getCurrentIndianTime();

//   servicemanBooking.acceptDate = nowDate;
//   servicemanBooking.acceptTime = nowTime;

//   servicemanBooking.updatedBy = userId;
//   servicemanBooking.actionById = userId;
//   booking.actionById = userId;

//   await booking.save();
//   await servicemanBooking.save();

//   return res.status(200).json({
//     success: true,
//     message: "Booking Accepted successfully",
//     data: {
//       booking,
//       servicemanBooking: servicemanBooking,
//     },
//   });
// });

// Generate OTP Booking
export const serviceManBookingStartOtp = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not found");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const servicemanBooking = await ServiceManBookingModel.findOne({ _id: req.params.id, servicemanId: serviceman?._id });
  if (!servicemanBooking) throw new ApiError(404, "Serviceman booking not found");

  const otp = generateOtp();
  const booking = await BookingModel.findById(servicemanBooking?.bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.otp = otp;

  await booking.save();

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
    data: {
      otp,
      status,
      servicemanBooking: servicemanBooking
    },
  });
});

// Verify OTP Booking
export const serviceManBookingStartVerifyOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  let status = 'ongoing';
  let selfiePath = null;

  try {
    const userId = req.user?._id;
    if (!userId) throw new ApiError(401, "User not found");

    const serviceman = await ServiceManProfileModel.findOne({ userId });
    if (!serviceman) throw new ApiError(404, "Service man profile not found");

    const servicemanBooking = await ServiceManBookingModel.findOne({ _id: req.params.id, servicemanId: serviceman?._id });
    if (!servicemanBooking) throw new ApiError(404, "Serviceman booking not found");

    const booking = await BookingModel.findById(servicemanBooking?.bookingId);
    if (!booking) throw new ApiError(404, "Booking not found");

    if (status != 'accept')
      if (otp !== booking.otp) throw new ApiError(400, "Invalid OTP");


    // if (req.file && req.file.buffer) {
    //   selfiePath = await compressImage(
    //     req.file.buffer,
    //     "servicemanSelfies",
    //   );
    //   servicemanBooking.selfie = selfiePath;
    // };

    if (req.files?.selfie?.[0]) {
      selfiePath = await compressImage(req.files.selfie[0].buffer, "servicemanSelfies");
      servicemanBooking.selfie = selfiePath;
    };

    booking.status = status || booking?.status;
    servicemanBooking.status = status || servicemanBooking?.status;

    const nowDate = new Date();
    const nowTime = getCurrentIndianTime();

    if (!servicemanBooking.startDate) servicemanBooking.startDate = nowDate;
    if (!servicemanBooking.startTime) servicemanBooking.startTime = nowTime;

    servicemanBooking.updatedBy = userId;
    servicemanBooking.actionById = userId;
    booking.actionById = userId;

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
  } catch (error) {
    if (selfiePath && fs.existsSync(path.join(process.cwd(), selfiePath))) {
      fs.unlinkSync(path.join(process.cwd(), selfiePath));
    };
    throw error;
  };
});


// ================= Comlete booking =================
export const servicemanBookingComplete = asyncHandler(async (req, res) => {
  const {
    bookingId,
    servicemanBookingId,
    paymentMode,
    type,
  } = req.body;

  const userId = req.user?._id;

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const servicemanId = serviceman?._id;

  const updatedBooking = await BookingModel.findByIdAndUpdate(
    bookingId,
    { status: "complete" },
    { new: true }
  );

  await ServiceManBookingModel.findByIdAndUpdate(
    servicemanBookingId,
    { status: "complete" },
    { new: true }
  );

  await createServicemanEarning(servicemanId, servicemanBookingId, userId)

  const {
    booking: bookingDetail,
    bookingItems,
    serviceman: provider,
    customer,
    address,
    company,
  } = await createInvoice(bookingId);

  await InvoiceModel.create({
    type: "Customer",
    bookingId,
    servicemanBookingId,
    providerId: provider?._id,
    servicemanUserId: provider?.userId,
    customerId: customer?._id,
    customerName: customer?.name || "",
    customerEmail: customer?.email || "",
    customerMobile: customer?.mobile || "",
    customerProfileImage: customer?.profileImage || "",
    deliveryAddress: address?.houseNumber || "",
    landmark: address?.landmark || "",
    customerStateName: address?.stateName || "",
    custmerStateCode: address?.stateCode || "",
    bookingDetail: bookingDetail || {},
    bookingItemDetail: bookingItems || [],
    latestServicemanDetail: provider || {},
    companyDetail: company || {},
    customerDetail: customer || {},
    addressDetail: address || {},
  });

  await InvoiceModel.create({
    type: "Provider",
    bookingId,
    servicemanBookingId,
    providerId: provider?._id,
    servicemanUserId: provider?.userId,
    customerId: customer?._id,
    customerName: customer?.name || "",
    customerEmail: customer?.email || "",
    customerMobile: customer?.mobile || "",
    customerProfileImage: customer?.profileImage || "",
    deliveryAddress: address?.houseNumber || "",
    landmark: address?.landmark || "",
    customerStateName: address?.stateName || "",
    custmerStateCode: address?.stateCode || "",
    bookingDetail: bookingDetail || {},
    bookingItemDetail: bookingItems || [],
    latestServicemanDetail: provider || {},
    companyDetail: company || {},
    customerDetail: customer || {},
    addressDetail: address || {},
  });

  await InvoiceModel.create({
    type: "Admin",
    bookingId,
    servicemanBookingId,
    providerId: provider?._id,
    servicemanUserId: provider?.userId,
    customerId: customer?._id,
    customerName: customer?.name || "",
    customerEmail: customer?.email || "",
    customerMobile: customer?.mobile || "",
    customerProfileImage: customer?.profileImage || "",
    deliveryAddress: address?.houseNumber || "",
    landmark: address?.landmark || "",
    customerStateName: address?.stateName || "",
    custmerStateCode: address?.stateCode || "",
    bookingDetail: bookingDetail || {},
    bookingItemDetail: bookingItems || [],
    latestServicemanDetail: provider || {},
    companyDetail: company || {},
    customerDetail: customer || {},
    addressDetail: address || {},
  });

  if (paymentMode?.toLowerCase() == "cod") {
    await CashCollectedLoggerModel.create({
      type,
      bookingId,
      providerId: userId,
      amount: updatedBooking?.payableAmount,
      createdBy: userId,
      createdAt: new Date(),
    });

    await BookingModel.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: 1,
        cashColletedSubmitAmount: updatedBooking?.payableAmount,
        cashColletedAmount: updatedBooking?.payableAmount,
        cashColletedPendingAmount: 0,
      },
      { new: true },
    );
  };

  return res.status(201).json({
    success: true,
    message: "Completed successfully",
    data: {},
  });
});
