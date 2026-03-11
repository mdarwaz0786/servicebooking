import mongoose from "mongoose";
import ServicemanEarningModel from "../../models/servicemanEarning.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BankTransferModel from "../../models/bankTransfer.model.js";
import CashCollectedLoggerModel from "../../models/cashCollectedLogger.model.js";
import CashCollectedSubmitModel from "../../models/cashCollectedSubmit.model.js";

// get total earning new
export const getTotalEarnings = asyncHandler(async (req, res) => {
  const servicemanId = req.user?._id;
  const { year } = req.query;

  const selectedYear = year
    ? parseInt(year)
    : new Date().getFullYear();

  const startOfYear = new Date(selectedYear, 0, 1, 0, 0, 0);
  const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59);

  const now = new Date();

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
    0, 0, 0
  );

  const last3MonthStart = new Date(
    now.getFullYear(),
    now.getMonth() - 2,
    1,
    0, 0, 0
  );

  const objectId = new mongoose.Types.ObjectId(servicemanId);

  /* ---------------- Month Wise (Selected Year) ---------------- */
  const earningData = await ServicemanEarningModel.aggregate([
    {
      $match: {
        servicemanId: objectId,
        status: true,
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      },
    },
    {
      $group: {
        _id: {
          $month: {
            date: "$createdAt",
            timezone: "Asia/Kolkata"
          }
        },
        totalAmount: { $sum: "$earningAmount" },
      },
    },
    { $sort: { "_id": 1 } }
  ]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const earningMap = {};

  earningData?.forEach((item) => {
    earningMap[item?._id] = item?.totalAmount;
  });

  const monthWise = monthNames?.map((monthName, index) => ({
    month: monthName,
    amount: earningMap[index + 1] || 0
  }));

  /* ---------------- Totals (Single Aggregation) ---------------- */
  const totals = await ServicemanEarningModel.aggregate([
    {
      $match: {
        servicemanId: objectId,
        status: true
      }
    },
    {
      $facet: {
        totalEarning: [
          { $group: { _id: null, amount: { $sum: "$earningAmount" } } }
        ],
        totalPaid: [
          { $match: { payoutStatus: true } },
          { $group: { _id: null, amount: { $sum: "$earningAmount" } } }
        ],
        totalUnpaid: [
          { $match: { payoutStatus: false } },
          { $group: { _id: null, amount: { $sum: "$earningAmount" } } }
        ],
        thisMonth: [
          { $match: { createdAt: { $gte: startOfMonth } } },
          { $group: { _id: null, amount: { $sum: "$earningAmount" } } }
        ],
        lastThreeMonths: [
          { $match: { createdAt: { $gte: last3MonthStart } } },
          { $group: { _id: null, amount: { $sum: "$earningAmount" } } }
        ],
        thisYear: [
          { $match: { createdAt: { $gte: startOfYear, $lte: endOfYear } } },
          { $group: { _id: null, amount: { $sum: "$earningAmount" } } }
        ]
      }
    }
  ]);

  const stats = totals[0];

  const bankTransfer = await BankTransferModel
    .find({ servicemanId })
    .select("amount fromDate toDate paymentStatus paymentMode")
    .sort({ createdAt: -1 })
    .limit(10);

  const cashCollected = await CashCollectedLoggerModel.findOne({
    providerId: servicemanId,
  }).sort({ createdAt: -1 });

  const cashCollectedSubmit = await CashCollectedSubmitModel.findOne({
    providerId: servicemanId,
  }).sort({ createdAt: -1 });

  let cashCollectedSubmitPending = Number(cashCollected?.totalCashCollected || 0) - Number(cashCollectedSubmit?.totalSubmitAmount || 0);

  return res.json({
    success: true,
    message: "Data fetched successfully",
    data: {
      totals: {
        totalEarningAmount: stats.totalEarning[0]?.amount || 0,
        receivedEarningAmount: stats.totalPaid[0]?.amount || 0,
        remainingEarningAmount: stats.totalUnpaid[0]?.amount || 0,
        thisMonthEarningAmount: stats.thisMonth[0]?.amount || 0,
        lastThreeMonthEarningAmount: stats.lastThreeMonths[0]?.amount || 0,
        thisYearEarningAmount: stats.thisYear[0]?.amount || 0,
        cashCollectedSubmitPending: cashCollectedSubmitPending,
      },
      monthWiseEarning: monthWise,
      bankTransfer: bankTransfer,
    },
  });
});

// get total earning updated
export const getServicemanEarnings = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not authenticated");

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const matchStage = {
    servicemanId: userId,
    status: true,
  };

  const aggregation = await ServicemanEarningModel.aggregate([
    { $match: matchStage },

    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },

          // 🔹 Booking (ALL FIELDS)
          {
            $lookup: {
              from: "bookings",
              localField: "booking",
              foreignField: "_id",
              as: "booking",
            },
          },
          { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },

          // 🔹 Booking Items
          {
            $lookup: {
              from: "bookingitems",
              localField: "booking._id",
              foreignField: "bookingId",
              as: "bookingItems",
            },
          },

          // 🔹 Services
          {
            $lookup: {
              from: "services",
              localField: "bookingItems.serviceId",
              foreignField: "_id",
              as: "servicesData",
            },
          },

          // 🔹 Additional Parts
          {
            $lookup: {
              from: "bookingadditionalparts",
              localField: "bookingItems._id",
              foreignField: "serviceItemId",
              as: "additionalPartsData",
            },
          },

          // 🔹 Merge Service + Additional Parts
          {
            $addFields: {
              bookingItems: {
                $map: {
                  input: "$bookingItems",
                  as: "item",
                  in: {
                    $mergeObjects: [
                      "$$item",
                      {
                        service: {
                          $let: {
                            vars: {
                              serviceObj: {
                                $arrayElemAt: [
                                  {
                                    $filter: {
                                      input: "$servicesData",
                                      as: "srv",
                                      cond: {
                                        $eq: ["$$srv._id", "$$item.serviceId"],
                                      },
                                    },
                                  },
                                  0,
                                ],
                              },
                            },
                            in: {
                              $cond: [
                                "$$serviceObj",
                                {
                                  $mergeObjects: [
                                    "$$serviceObj",
                                    { shortDescription: "$$REMOVE" }, // ❌ Exclude shortDescription
                                  ],
                                },
                                null,
                              ],
                            },
                          },
                        },
                        additionalParts: {
                          $filter: {
                            input: "$additionalPartsData",
                            as: "part",
                            cond: {
                              $eq: ["$$part.serviceItemId", "$$item._id"],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },

          // 🔹 Remove temporary arrays only
          {
            $project: {
              servicesData: 0,
              additionalPartsData: 0,
            },
          },

          // 🔹 Serviceman Booking (ALL FIELDS)
          {
            $lookup: {
              from: "servicemanbookings",
              localField: "servicemanBooking",
              foreignField: "_id",
              as: "servicemanBooking",
            },
          },
          { $unwind: { path: "$servicemanBooking", preserveNullAndEmptyArrays: true } },

          // 🔹 Customer
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "customer",
            },
          },
          { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },

          // 🔹 Serviceman Profile
          {
            $lookup: {
              from: "servicemanprofiles",
              localField: "servicemanId",
              foreignField: "userId",
              as: "servicemanProfile",
            },
          },
          { $unwind: { path: "$servicemanProfile", preserveNullAndEmptyArrays: true } },
        ],

        summary: [
          {
            $group: {
              _id: null,
              totalEarning: { $sum: "$earningAmount" },
              totalPayable: { $sum: "$payableAmount" },
              totalRecords: { $sum: 1 },
            },
          },
        ],
      },
    },

    {
      $project: {
        data: 1,
        summary: { $arrayElemAt: ["$summary", 0] },
      },
    },
  ]);

  const result = aggregation[0] || {};
  const earnings = result?.data || [];
  const summary = result?.summary || {
    totalEarning: 0,
    totalPayable: 0,
    totalRecords: 0,
  };

  const totalPages = Math.ceil(summary.totalRecords / limit);

  return res.status(200).json({
    success: true,
    message: "Serviceman earnings fetched successfully",
    data: earnings,
    summary,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
  });
});



