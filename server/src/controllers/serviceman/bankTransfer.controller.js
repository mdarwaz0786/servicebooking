import mongoose from "mongoose";
import ServicemanEarningModel from "../../models/servicemanEarning.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BankTransferModel from "../../models/bankTransfer.model.js";

export const getEarnings = asyncHandler(async (req, res) => {
  const servicemanId = req.user?._id;
  const { year } = req.query;

  const selectedYear = year
    ? parseInt(year)
    : new Date().getFullYear();

  const startOfYear = new Date(`${selectedYear}-01-01`);
  const endOfYear = new Date(`${selectedYear}-12-31`);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const last3MonthStart = new Date();
  last3MonthStart.setMonth(now.getMonth() - 2);
  last3MonthStart.setDate(1);

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
        _id: { $month: "$createdAt" },
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

  earningData.forEach((item) => {
    earningMap[item?._id] = item?.totalAmount;
  });

  const monthWise = monthNames.map((monthName, index) => ({
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
    .sort({ createdAt: -1 })
    .limit(10);

  return res.json({
    success: true,
    message: "Data fetched successfully",
    data: {
      totals: {
        totalEarningAmount: stats.totalEarning[0]?.amount || 0,
        totalPaidEarningAmount: stats.totalPaid[0]?.amount || 0,
        remainingEarningAmount: stats.totalUnpaid[0]?.amount || 0,
        thisMonthEarningAmount: stats.thisMonth[0]?.amount || 0,
        lastThreeMonthEarningAmount: stats.lastThreeMonths[0]?.amount || 0,
        thisYearEarningAmount: stats.thisYear[0]?.amount || 0,
        cashCollectedSubmitPending: 0,
      },
      monthWiseEarning: monthWise,
      bankTransfer: bankTransfer,
    },
  });
});

// get all bank transefer
export const getBankTransfers = asyncHandler(async (req, res) => {
  const servicemanId = req.user?._id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const [bankTransfers, total] = await Promise.all([
    BankTransferModel
      .find({ servicemanId })
      .select("amount fromDate toDate paymentStatus paymentMode createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    BankTransferModel.countDocuments({ servicemanId })
  ]);

  return res.json({
    success: true,
    message: "data fetched successfully",
    data: bankTransfers,
    pagination: {
      totalRecords: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit,
    },
  });
});
