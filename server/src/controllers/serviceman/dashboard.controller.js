import WalletModel from "../../models/wallet.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
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

  return res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully",
    data: {
      wallet: summary,
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
      totalEarnning: 1999,
      todayEarnning: 100,
    }
  });
});
