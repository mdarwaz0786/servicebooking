import WalletModel from "../../models/wallet.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createWallet = asyncHandler(async (req, res) => {
  const {
    depositAmount,
    transactionId,
  } = req.body;

  const userId = req.user?._id;

  if (!userId) throw new ApiError(400, "User is required");
  if (!transactionId) throw new ApiError(400, "Transaction Id is required");
  if (!depositAmount) throw new ApiError(400, "Deposit amount is required");

  const wallet = await WalletModel.create({
    providerId: userId,
    depositAmount,
    depositStatus: "Paid",
    dateOfDeposit: new Date(),
    paymentMode: "Online",
    transactionType: "Credit",
    transactionId,
    purpose: "Recharge",
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: wallet });
});

export const getWallets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "User not authenticated");

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = { providerId: userId, status: true };

  // Get paginated wallets
  const wallets = await WalletModel.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  // Aggregation to calculate total Credit, Debit, and points
  const aggregation = await WalletModel.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        totalCreditAmount: {
          $sum: { $cond: [{ $eq: ["$transactionType", "Credit"] }, "$depositAmount", 0] }
        },
        totalDebitAmount: {
          $sum: { $cond: [{ $eq: ["$transactionType", "Debit"] }, "$depositAmount", 0] }
        },
        totalCreditPointsCredit: {
          $sum: { $cond: [{ $eq: ["$transactionType", "Credit"] }, "$creditPoints", 0] }
        },
        totalCreditPointsDebit: {
          $sum: { $cond: [{ $eq: ["$transactionType", "Debit"] }, "$creditPoints", 0] }
        },
        totalTransactions: { $sum: 1 }
      }
    },
    {
      $addFields: {
        balance: { $subtract: ["$totalCreditAmount", "$totalDebitAmount"] },
        totalCreditPoints: { $subtract: ["$totalCreditPointsCredit", "$totalCreditPointsDebit"] }
      }
    }
  ]);

  const summary = aggregation[0] || {
    totalCreditAmount: 0,
    totalDebitAmount: 0,
    totalCreditPointsCredit: 0,
    totalCreditPointsDebit: 0,
    balance: 0,
    totalCreditPoints: 0,
    totalTransactions: 0
  };

  const totalPages = Math.ceil(summary.totalTransactions / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: wallets,
    summary,
    total: summary.totalTransactions,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    pagination: buildPagination({ page, limit, total: summary.totalTransactions })
  });
});


