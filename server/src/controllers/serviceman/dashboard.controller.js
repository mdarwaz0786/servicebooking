import WalletModel from "../../models/wallet.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ServicemanEarningModel from "../../models/servicemanEarning.model.js";
import ServicemanTimeSlot from "../../models/servicemanTimeSlot.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const dashboard = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not authenticated");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  //  WALLET SUMMARY
  const walletAgg = await WalletModel.aggregate([
    { $match: { providerId: userId, status: true } },
    {
      $group: {
        _id: null,
        creditAmount: {
          $sum: { $cond: [{ $eq: ["$transactionType", "Credit"] }, "$depositAmount", 0] }
        },
        debitAmount: {
          $sum: { $cond: [{ $eq: ["$transactionType", "Debit"] }, "$depositAmount", 0] }
        },
        creditPointsCredit: {
          $sum: { $cond: [{ $eq: ["$transactionType", "Credit"] }, "$creditPoints", 0] }
        },
        creditPointsDebit: {
          $sum: { $cond: [{ $eq: ["$transactionType", "Debit"] }, "$creditPoints", 0] }
        }
      }
    },
    {
      $project: {
        _id: 0,
        balance: { $subtract: ["$creditAmount", "$debitAmount"] },
        totalCreditPoints: {
          $subtract: ["$creditPointsCredit", "$creditPointsDebit"]
        }
      }
    }
  ]);

  const summary = walletAgg[0] || {
    totalCreditAmount: 0,
    totalDebitAmount: 0,
    totalCreditPointsCredit: 0,
    totalCreditPointsDebit: 0,
    balance: 0,
    totalCreditPoints: 0,
    totalTransactions: 0
  };

  //  BOOKING STATUS COUNTS
  const bookingAgg = await ServiceManBookingModel.aggregate([
    { $match: { servicemanId: serviceman?._id } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$count" },
        statuses: {
          $push: { k: "$_id", v: "$count" }
        }
      }
    },
    {
      $project: {
        _id: 0,
        bookings: {
          $mergeObjects: [
            {
              new: 0,
              accept: 0,
              reject: 0,
              ongoing: 0,
              complete: 0,
              cancel: 0,
              partstatusnew: 0,
              partstatusconfirm: 0,
              partstatusapprove: 0,
              partstatusreject: 0
            },
            { $arrayToObject: "$statuses" },
            { total: "$total" }
          ]
        }
      }
    }
  ]);

  const todayBookings = await ServiceManBookingModel.aggregate([
    {
      $match: {
        servicemanId: serviceman._id
      }
    },

    // JOIN BOOKING COLLECTION
    {
      $lookup: {
        from: "bookings",          // Booking collection name
        localField: "bookingId",
        foreignField: "_id",
        as: "booking"
      }
    },
    { $unwind: "$booking" },

    // FILTER TODAY USING BOOKING.scheduleDate
    {
      $match: {
        "booking.scheduleDate": {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },

    // SORT BY BOOKING.scheduleDate
    {
      $sort: { "booking.scheduleDate": -1 }
    },

    // OPTIONAL: JOIN USER
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } }
  ]);

  // TOTAL EARNING (ALL TIME)
  const totalEarningAgg = await ServicemanEarningModel.aggregate([
    {
      $match: {
        servicemanId: userId,
        status: true,
      },
    },
    {
      $group: {
        _id: null,
        totalEarning: { $sum: "$earningAmount" },
      },
    },
  ]);

  const totalEarning = totalEarningAgg[0]?.totalEarning || 0;

  // TODAY EARNING
  const todayEarningAgg = await ServicemanEarningModel.aggregate([
    {
      $match: {
        servicemanId: userId,
        status: true,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      },
    },
    {
      $group: {
        _id: null,
        todayEarning: { $sum: "$earningAmount" },
      },
    },
  ]);

  const todayEarning = todayEarningAgg[0]?.todayEarning || 0;

  // DATE RANGE: LAST 7 DAYS
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date();
  endOfWeek.setHours(23, 59, 59, 999);
  const categoryIds = serviceman?.categoryIds;

  // WINNER OF THE WEEK (TOP 3 SERVICEMEN – CATEGORY FILTERED)
  const winnerOfTheWeek = await ServiceManBookingModel.aggregate([
    {
      $match: {
        status: "complete",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek }
      }
    },

    // COUNT COMPLETED BOOKINGS
    {
      $group: {
        _id: "$servicemanId",
        completedBookings: { $sum: 1 }
      }
    },

    { $sort: { completedBookings: -1 } },
    { $limit: 3 },

    // JOIN SERVICEMAN PROFILE
    {
      $lookup: {
        from: "servicemanprofiles",
        localField: "_id",
        foreignField: "_id",
        as: "serviceman"
      }
    },
    { $unwind: "$serviceman" },

    // FILTER SERVICEMAN BY CATEGORY
    {
      $match: {
        "serviceman.categoryIds": { $in: categoryIds }
      }
    },

    // JOIN CATEGORY COLLECTION (ONLY MATCHING CATEGORIES)
    {
      $lookup: {
        from: "categories",
        let: { catIds: "$serviceman.categoryIds" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$catIds"] },
                  { $in: ["$_id", categoryIds] } // FILTER AGAINST LOGGED-IN SERVICEMAN
                ]
              }
            }
          },
          {
            $project: {
              _id: 1,
              name: 1
            }
          }
        ],
        as: "categories"
      }
    },

    // FINAL SHAPE
    {
      $project: {
        _id: 0,
        providerId: "$serviceman.servicemanId",
        name: "$serviceman.name",
        profileImage: "$serviceman.profileImage",
        completedBookings: 1,
        categories: 1
      }
    }
  ]);

  // TODAY TIME SLOTS COUNT
  const todayTimeSlots = await ServicemanTimeSlot.find({
    servicemanId: userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // TOMORROW TIME SLOTS COUNT
  const tomorrowTimeSlots = await ServicemanTimeSlot.find({
    servicemanId: userId,
    date: { $gte: tomorrow, $lte: new Date(tomorrow.getTime() + 86399999) },
  });

  return res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully",
    data: {
      wallet: summary,
      todayTimeSlots: todayTimeSlots ? 1 : 0,
      tomorrowTimeSlots: tomorrowTimeSlots ? 1 : 0,
      bookings: bookingAgg[0]?.bookings || {
        total: 0,
        new: 0,
        accept: 0,
        reject: 0,
        ongoing: 0,
        complete: 0,
        cancel: 0,
        partstatusnew: 0,
        partstatusconfirm: 0,
        partstatusapprove: 0,
        partstatusreject: 0
      },
      todayBookings: todayBookings,
      totalEarnning: totalEarning,
      todayEarnning: todayEarning,
      winnerOfTheWeek: winnerOfTheWeek,
    }
  });
});
