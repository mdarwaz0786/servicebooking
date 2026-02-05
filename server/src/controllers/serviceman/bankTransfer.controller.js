import mongoose from "mongoose";
import ServicemanEarningModel from "../../models/servicemanEarning.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BankTransferModel from "../../models/bankTransfer.model.js";

export const getMonthWiseEarningWithBankTransfer = asyncHandler(async (req, res) => {
  const servicemanId = req.user?._id;
  const { year } = req.query;

  const selectedYear = year
    ? parseInt(year)
    : new Date().getFullYear();

  const startDate = new Date(`${selectedYear}-01-01`);
  const endDate = new Date(`${selectedYear}-12-31`);

  const earningData = await ServicemanEarningModel.aggregate([
    {
      $match: {
        servicemanId: new mongoose.Types.ObjectId(servicemanId),
        status: true,
        createdAt: { $gte: startDate, $lte: endDate },
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
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const earning = earningData.map((item) => ({
    month: monthNames[item?._id - 1],
    amount: item?.totalAmount,
  }));

  const bankTransfer = await BankTransferModel
    .find({ servicemanId })
    .select("amount fromDate toDate paymentStatus paymentMode")
    .sort({ createdAt: -1 })
    .limit(10);

  return res.json({
    success: true,
    message: "Date fetched successfully",
    year: selectedYear,
    data: {
      earning: earning,
      bankTransfer: bankTransfer,
    },
  });
});
