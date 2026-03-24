import AddressModel from "../../models/address.model.js";
import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ReviewModel from "../../models/review.model.js";
import PincodeModel from "../../models/pincode.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { getCartData } from "../../utils/cart.utils.js";
import CartModel from "../../models/cart.model.js";
import { buildPagination } from "../../utils/pagination.js";
import generateOtp from "../../utils/generateOpt.js";
import { adjustWalletCredit, getSupportConfig } from "../../utils/wallet.utils.js";
import { autoAssignBooking, autoAssignMultipleServicemen } from "../../utils/autoAssignBooking.js";
import ServiceManProfile from "../../models/servicemanProfile.model.js";
import rejectAdditionalParts from "../../utils/rejectAdditionalPart.js";
import sendNotification from "../../utils/sendNotification.js";
import BookingWarrantyModel from "../../models/bookingWarranty.model.js";
import { getIO } from "../../socket/socket.js";

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
    pincode,
    isCouponUsed,
  } = req.body;

  const lastBooking = await BookingModel
    .findOne({ userId })
    .sort({ createdAt: -1 });

  if (lastBooking) {
    const now = new Date();
    const lastBookingTime = new Date(lastBooking?.createdAt);

    const diffInMs = now - lastBookingTime;
    const diffInMinutes = diffInMs / (1000 * 60);

    if (diffInMinutes < 2) {
      return res.status(400).json({
        success: false,
        message: "Please wait 2 minutes before creating another booking.",
      });
    }
  };

  // Get cart data from utility
  const { cartProducts, amountData } = await getCartData(userId);
  if (!cartProducts.length) throw new ApiError(400, "Cart is empty");

  const address = await AddressModel.findById(addressId);
  if (!address) throw new ApiError(400, "Address not found");

  const lat = address?.lat;
  const long = address?.long;
  const pin = address?.pincode || pincode;
  const subCategoryId = cartProducts[0]?.subCategoryId;

  const verifyPincode = await PincodeModel.findOne({ pincoode: pin });

  if (!verifyPincode) {
    throw new ApiError(400, "Sorry, our service is currently not available in your area or pincode");
  };

  const otp = generateOtp();

  // Create Booking
  const booking = await BookingModel.create({
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
    otp: otp,
    createdBy: userId,
  });

  // const { acceptCreditPoints } = await getSupportConfig(booking?._id);
  // const serviceman = await autoAssignBooking(lat, long, subCategoryId, scheduleDate, scheduleTime, acceptCreditPoints);

  // Prepare Booking Items from cartProducts
  const bookingItems = cartProducts.map((item) => ({
    bookingId: booking?._id,
    userId,
    serviceId: item.serviceId,
    quantity: item.quantity,
    mrpPrice: item.mrpPrice || 0,
    salePrice: item.salePrice || 0,
    isMediaUpload: item?.isMediaUpload || 0,
  }));

  // Insert Booking Items
  await BookingItemModel.insertMany(bookingItems);

  // if (serviceman && paymentMode == 'cod') {
  //   await ServiceManBookingModel.create({
  //     bookingId: booking?._id,
  //     servicemanId: serviceman?._id,
  //     userId,
  //     status: "accept",
  //     createdBy: userId,
  //   });

  //   await BookingModel.findByIdAndUpdate(booking?._id, {
  //     $set: {
  //       status: "accept",
  //     },
  //   });

  //   const status = "accept";

  //   await adjustWalletCredit(serviceman?.userId, status, booking?._id);

  //   if (serviceman?.userId) {
  //     await sendNotification(
  //       [serviceman?.userId],
  //       "Booking Accepted",
  //       "One booking is accepted to you kindly proceed further",
  //       "serviceman",
  //       {
  //         type: "bookingSameZone",
  //       }
  //     );
  //   };
  // };

  // if (!serviceman && paymentMode === "cod") {
  //   const servicemen = await autoAssignMultipleServicemen(
  //     subCategoryId,
  //     scheduleDate,
  //     scheduleTime,
  //     acceptCreditPoints
  //   );

  //   if (servicemen?.length) {
  //     const bookings = servicemen?.map((sm) => ({
  //       bookingId: booking?._id,
  //       servicemanId: sm?._id,
  //       userId,
  //       status: "new",
  //       createdBy: userId,
  //     }));

  //     await ServiceManBookingModel.insertMany(bookings);

  //     const servicemanUserIds = servicemen
  //       .map((sm) => sm?.userId)
  //       .filter(Boolean);

  //     await sendNotification(
  //       servicemanUserIds,
  //       "New Booking",
  //       "You have received a new booking kindly accept it if you can serve it",
  //       "serviceman",
  //       {
  //         type: "bookingOtherZone",
  //       }
  //     );
  //   };
  // };

  // Clear User Cart
  if (paymentMode == 'cod') {
    await CartModel.deleteMany({ userId });
  };

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

  filters.$nor = [
    {
      paymentMode: "online",
      paymentStatus: 0,
    },
  ];

  const bookings = await BookingModel
    .find(filters)
    .populate({ path: "user", select: "-password" })
    .populate("address")
    .populate({
      path: "bookingItems",
      strictPopulate: false,
      populate: [
        {
          path: "service",
          select: "name image",
          strictPopulate: false,
        },
        {
          path: "warranty",
          select: "isWarranty expiryDate",
          strictPopulate: false,
        }
      ]
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  for (let booking of bookings) {
    const today = new Date();

    const warranty = await BookingWarrantyModel.findOne({
      bookingId: booking?.booking?._id,
      isWarranty: 1,
      expiryDate: { $gte: today },
    }).lean();

    booking.isWarranty = warranty ? 1 : 0;

    let latestAssignment = await ServiceManBookingModel
      .findOne({ bookingId: booking?._id, status: { $nin: ["taken", "new"] } })
      .sort({ createdAt: -1 })
      .lean();

    // if (!latestAssignment) {
    //   latestAssignment = await ServiceManBookingModel
    //     .findOne({ bookingId: booking?._id })
    //     .sort({ createdAt: -1 })
    //     .lean();
    // };

    if (latestAssignment) {
      const serviceman = await ServiceManProfileModel
        .findOne({ _id: latestAssignment.servicemanId })
        .populate("user", "mobile")
        .lean();

      booking.serviceman = serviceman
        ? {
          _id: serviceman?._id,
          userId: serviceman?.userId,
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
      bookingId: booking?._id, type: 1,
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

  const createdAt = new Date(booking?.createdAt);
  const now = new Date();
  const diffInMinutes = (now - createdAt) / (1000 * 60);

  let latestAssignment = await ServiceManBookingModel
    .findOne({ bookingId: booking?._id, status: { $nin: ["taken", "new"] } })
    .sort({ createdAt: -1 })
    .lean();

  // if (!latestAssignment) {
  //   latestAssignment = await ServiceManBookingModel
  //     .findOne({ bookingId: booking?._id })
  //     .sort({ createdAt: -1 })
  //     .lean();
  // };

  if (latestAssignment) {
    const servicemanId = latestAssignment?.servicemanId;
    const serviceman = await ServiceManProfileModel
      .findOne({ _id: servicemanId })
      .populate("user")
      .lean();

    booking.serviceman = serviceman
      ? {
        _id: serviceman?._id,
        userId: serviceman?.userId,
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
    bookingId: booking?._id, type: 1,
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

  booking.isCancel = diffInMinutes > 30 ? 0 : 1;

  const today = new Date();

  const warranty = await BookingWarrantyModel.findOne({
    bookingId: id,
    isWarranty: 1,
    expiryDate: { $gte: today },
  }).lean();

  booking.isWarranty = warranty ? 1 : 0;
  booking.servicemanBooking = latestAssignment;

  const items = await BookingItemModel
    .find({ bookingId: booking._id })
    .populate({ path: "service", select: "-shortDescription -fullDescription" })
    .populate("warranty")
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

  const checkCancelEligiblity = await BookingModel.findByIdAndUpdate(id, updateData, { new: true });

  const createdAt = new Date(checkCancelEligiblity?.createdAt);
  const now = new Date();
  const diffInMinutes = (now - createdAt) / (1000 * 60);

  if (req.body.status == "cancel" && diffInMinutes > 30) {
    throw new ApiError(404, "You can not cancel booking");
  };

  const booking = await BookingModel.findByIdAndUpdate(id, updateData, { new: true });

  if (!booking) throw new ApiError(404, "Booking not found");

  if (req.body.status) {
    const lastServicemanBooking = await ServiceManBookingModel.findOne({
      bookingId: booking?._id,
      status: { $nin: ["taken", "new"] },
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

      const latestServiceman = await ServiceManProfile.findById(lastServicemanBooking?.servicemanId);

      if (req.body.status == "cancel") {
        await adjustWalletCredit(latestServiceman?.userId, req.body.status, lastServicemanBooking?.bookingId);
      };
    };
  };

  if (req.body.status == "partstatusreject") {
    await rejectAdditionalParts(booking?._id);
  };

  const io = getIO();

  io.emit("updateBooking", {
    bookingId: booking?._id,
    status: req.body.status,
    message: "Booking status updated"
  });

  io.emit("updateBookingList", {
    bookingId: booking?._id,
    status: req.body.status,
    message: "Booking list updated"
  });

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: booking,
  });
});
