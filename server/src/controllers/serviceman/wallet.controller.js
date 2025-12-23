import WalletModel from "../../models/wallet.model.js";
import ServiceManProfile from "../../models/servicemanProfile.model.js";
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

  const serviceman = await ServiceManProfile.findOne({ userId });
  if (!serviceman) throw new ApiError(400, "Service man not found");

  if (!transactionId) throw new ApiError(400, "Transaction Id is required");
  if (!depositAmount) throw new ApiError(400, "Deposit amount is required");

  const wallet = await WalletModel.create({
    providerId: serviceman?._id,
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

// Get Wallets for serviceman
export const getWallets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "User not authenticated");

  const serviceman = await ServiceManProfile.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    providerId: serviceman?._id,
    status: true,
  };

  const wallets = await WalletModel
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const allWallets = await WalletModel.find(filter).lean();

  let balance = 0;
  let totalCreditPoints = 0;

  for (const w of allWallets) {
    if (w.transactionType === "Credit") {
      balance += w.depositAmount;
    } else if (w.transactionType === "Debit") {
      balance -= w.depositAmount;
    };

    totalCreditPoints += w.creditPoints || 0;
  };

  const totalTransactions = allWallets.length;
  const totalPages = Math.ceil(totalTransactions / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: wallets,
    summary: {
      balance,
      totalCreditPoints,
      totalTransactions,
    },
    total: totalTransactions,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    pagination: buildPagination({ page, limit, total: totalTransactions }),
  });
});

