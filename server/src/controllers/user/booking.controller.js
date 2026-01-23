import AddressModel from "../../models/address.model.js";
import ZoneModel from "../../models/zone.model.js";
import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ReviewModel from "../../models/review.model.js";
import PincodeModel from "../../models/pincode.model.js";
import Wallet from "../../models/wallet.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { getCartData } from "../../utils/cart.utils.js";
import CartModel from "../../models/cart.model.js";
import { buildPagination } from "../../utils/pagination.js";
import generateOtp from "../../utils/generateOpt.js";
import { getSupportConfig } from "../../utils/wallet.utils.js";
import { convert12To24 } from "../../utils/convert12to24.js";

// Create Booking + Booking Items
export const createBooking = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized: User not found");
  const { acceptCreditPoints } = await getSupportConfig();

  const {
    addressId,
    scheduleType,
    scheduleDate,
    scheduleTime,
    paymentMode,
    paymentBy,
    pincode,
    isCouponUsed } = req.body;

  // Get cart data from utility
  const { cartProducts, amountData } = await getCartData(userId);
  if (!cartProducts.length) throw new ApiError(400, "Cart is empty");

  const address = await AddressModel.findById(addressId);
  if (!address) throw new ApiError(400, "Address not found");

  const lat = address?.lat;
  const long = address?.long;
  const pin = address?.pincode || pincode;
  const categoryId = cartProducts[0]?.categoryId;

  const verifyPincode = await PincodeModel.findOne({ pincoode: pin });

  if (!verifyPincode) {
    throw new ApiError(400, "Sorry, our service is currently not available in your area or pincode");
  };

  // Find Zone
  const zone = await ZoneModel.findOne({
    status: true,
    geometry: {
      $geoIntersects: {
        $geometry: {
          type: "Point",
          coordinates: [long, lat],
        },
      },
    },
  }).select("_id");

  let serviceman = null;

  // if (zone) {
  //   serviceman = await ServiceManProfileModel.findOne({
  //     zones: zone?._id,
  //     categoryIds: categoryId,
  //   }).select("_id userId");
  // }

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  if (zone) {
    const bookingTime24 = convert12To24(scheduleTime);

    const servicemen = await Wallet.aggregate([
      // 1️⃣ Active wallets
      { $match: { status: true } },

      // 2️⃣ Latest wallet first
      { $sort: { createdAt: -1 } },

      // 3️⃣ Latest wallet per provider
      {
        $group: {
          _id: "$providerId",
          latestWallet: { $first: "$$ROOT" }
        }
      },

      // 4️⃣ Credit points condition
      {
        $match: {
          "latestWallet.currentCreditPoints": { $gt: acceptCreditPoints }
        }
      },

      // 5️⃣ Join serviceman profile
      {
        $lookup: {
          from: "servicemanprofiles",
          localField: "_id",
          foreignField: "userId",
          as: "serviceman"
        }
      },
      { $unwind: "$serviceman" },

      // 6️⃣ Zone + category
      {
        $match: {
          "serviceman.zones": zone?._id,
          "serviceman.categoryIds": categoryId
        }
      },

      // 7️⃣ KYC approved
      {
        $lookup: {
          from: "kycs",
          localField: "_id",
          foreignField: "userId",
          as: "kyc"
        }
      },
      { $unwind: "$kyc" },
      { $match: { "kyc.status": "approved" } },

      // 8️⃣ Training attendance PRESENT
      {
        $lookup: {
          from: "trainingschedulesubmits",
          let: { providerId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$providerId", "$$providerId"] },
                    { $eq: ["$type", 1] },
                    { $eq: ["$attendanceStatus", "Present"] },
                    { $eq: ["$status", true] }
                  ]
                }
              }
            },
            { $limit: 1 }
          ],
          as: "trainingAttendance"
        }
      },
      { $match: { trainingAttendance: { $ne: [] } } },

      // 9️⃣ Time slot availability
      {
        $lookup: {
          from: "servicemantimeslots",
          let: {
            providerId: "$_id",
            bookingDate: new Date(scheduleDate),
            bookingTime: bookingTime24
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$servicemanId", "$$providerId"] },
                    { $eq: ["$status", true] },
                    {
                      $eq: [
                        { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        { $dateToString: { format: "%Y-%m-%d", date: "$$bookingDate" } }
                      ]
                    }
                  ]
                }
              }
            },
            { $unwind: "$times" },
            {
              $match: {
                $expr: {
                  $and: [
                    { $lte: ["$times.from", "$$bookingTime"] },
                    { $gte: ["$times.to", "$$bookingTime"] }
                  ]
                }
              }
            }
          ],
          as: "availableSlot"
        }
      },
      { $match: { availableSlot: { $ne: [] } } },

      // 10️⃣ TODAY BOOKING COUNT
      {
        $lookup: {
          from: "servicemanbookings",
          let: { servicemanId: "$serviceman._id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$servicemanId", "$$servicemanId"] },
                    { $gte: ["$createdAt", startOfToday] },
                    { $lte: ["$createdAt", endOfToday] }
                  ]
                }
              }
            },
            {
              $group: {
                _id: "$servicemanId",
                count: { $sum: 1 }
              }
            }
          ],
          as: "todayBookings"
        }
      },

      // 11️⃣ Normalize booking count
      {
        $addFields: {
          todayBookingCount: {
            $ifNull: [{ $arrayElemAt: ["$todayBookings.count", 0] }, 0]
          }
        }
      },

      // 12️⃣ Least bookings FIRST
      { $sort: { todayBookingCount: 1 } },

      // 13️⃣ Pick ONE serviceman
      { $limit: 1 },

      // 🔚 Final output
      {
        $project: {
          _id: "$serviceman._id",
          userId: "$serviceman.userId",
          todayBookingCount: 1,
          currentCreditPoints: "$latestWallet.currentCreditPoints"
        }
      }
    ]);

    serviceman = servicemen[0] || null;
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

  if (serviceman) {
    await ServiceManBookingModel.create({
      bookingId: booking?._id,
      servicemanId: serviceman?._id,
      userId,
      status: "new",
      createdBy: userId,
    });
  };

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
  if (paymentMode == 'cod') {
    await CartModel.deleteMany({ userId });
  }

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

  const latestAssignment = await ServiceManBookingModel
    .findOne({ bookingId: booking?._id })
    .sort({ createdAt: -1 })
    .lean();

  if (latestAssignment) {
    const servicemanId = latestAssignment?.servicemanId;
    const serviceman = await ServiceManProfileModel
      .findOne({ _id: servicemanId })
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
