import WalletModel from "../../models/wallet.model.js";
import ServiceManProfile from "../../models/servicemanProfile.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

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

export const getWallets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "User not authenticated");
  const serviceman = await ServiceManProfile.findOne({ userId });

  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const wallets = await WalletModel.find({
    providerId: serviceman?._id,
    status: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  let balance = 0;
  let totalCreditPoints = 0;

  for (const w of wallets) {
    if (w.transactionType === "Credit") {
      balance += w.depositAmount;
    } else if (w.transactionType === "Debit") {
      balance -= w.depositAmount;
    };

    totalCreditPoints += w.creditPoints || 0;
  };

  return res.status(200).json({
    success: true,
    message: "data fetched successfully",
    data: wallets,
    summary: {
      balance,
      totalCreditPoints,
      totalTransactions: wallets.length,
    },
  });
});
