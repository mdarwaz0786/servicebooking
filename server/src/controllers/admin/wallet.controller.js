import WalletModel from "../../models/wallet.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import { getTotalCreditPoints } from "../../utils/wallet.utils.js";

export const createWallet = asyncHandler(async (req, res) => {
  const {
    providerId,
    depositAmount,
    depositStatus,
    dateOfDeposit,
    paymentMode,
    transactionType,
    transactionId,
    transactionNumber,
    purpose,
  } = req.body;

  if (!providerId) throw new ApiError(400, "Provider ID is required");
  if (!dateOfDeposit) throw new ApiError(400, "Date of deposit is required");
  if (!paymentMode) throw new ApiError(400, "Payment mode is required");
  if (!transactionType) throw new ApiError(400, "Transaction type is required");

  const previousCreditPoints = await getTotalCreditPoints();
  let currentCreditPoints;

  if (transactionType == "Credit") {
    currentCreditPoints = previousCreditPoints + (Number(depositAmount) * 0.1);
  };

  if (transactionType == "Debit") {
    currentCreditPoints = previousCreditPoints - (Number(depositAmount) * 0.1);
  };

  const wallet = await WalletModel.create({
    providerId,
    depositAmount,
    depositStatus,
    dateOfDeposit,
    paymentMode,
    transactionType,
    transactionId,
    transactionNumber,
    purpose,
    currentCreditPoints: currentCreditPoints,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: wallet });
});

export const getWallets = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit, serviceman, depositStatus, paymentMode, transactionType } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (serviceman) filters.providerId = serviceman;
  if (paymentMode) filters.paymentMode = paymentMode;
  if (transactionType) filters.transactionType = transactionType;
  if (depositStatus) filters.depositStatus = depositStatus;

  if (search) {
    filters.$or = [
      { transactionId: { $regex: search, $options: "i" } },
    ];
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const wallets = await WalletModel
    .find(filters)
    .populate("provider")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await WalletModel.countDocuments(filters);
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
    data: wallets,
    pagination: buildPagination({ page, limit, total })
  });
});

export const getWalletById = asyncHandler(async (req, res) => {
  const wallet = await WalletModel.findById(req.params.id).populate("provider");
  if (!wallet) throw new ApiError(404, "Wallet not found");
  return res.status(200).json({ success: true, data: wallet });
});

const calculatePoints = (amount) => Number(amount || 0) * 0.1;

const getSignedPoints = (type, amount) => {
  const points = calculatePoints(amount);
  return type === "Credit" ? points : -points;
};

export const updateWallet = asyncHandler(async (req, res) => {
  const {
    providerId,
    depositAmount,
    depositStatus,
    dateOfDeposit,
    paymentMode,
    transactionType,
    transactionId,
    transactionNumber,
    purpose,
    status
  } = req.body;

  const wallet = await WalletModel.findById(req.params.id);
  if (!wallet) throw new ApiError(404, "Wallet not found");

  /* ---------- STEP 1: REMOVE OLD EFFECT ---------- */
  const oldSignedPoints = getSignedPoints(
    wallet.transactionType,
    wallet.depositAmount
  );

  /* ---------- STEP 2: APPLY NEW EFFECT ---------- */
  const newType = transactionType || wallet.transactionType;
  const newAmount = depositAmount ?? wallet.depositAmount;

  const newSignedPoints = getSignedPoints(newType, newAmount);

  /* ---------- STEP 3: CALCULATE DELTA ---------- */
  const deltaPoints = newSignedPoints - oldSignedPoints;

  /* ---------- STEP 4: UPDATE CURRENT CREDIT POINTS ---------- */
  wallet.currentCreditPoints = Number(wallet.currentCreditPoints || 0) + deltaPoints;

  wallet.providerId = providerId || wallet.providerId;
  wallet.depositAmount = depositAmount || wallet.depositAmount;
  wallet.depositStatus = depositStatus || wallet.depositStatus;
  wallet.dateOfDeposit = dateOfDeposit || wallet.dateOfDeposit;
  wallet.paymentMode = paymentMode || wallet.paymentMode;
  wallet.transactionType = transactionType || wallet.transactionType;
  wallet.transactionId = transactionId || wallet.transactionId;
  wallet.transactionNumber = transactionNumber || wallet.transactionNumber;
  wallet.purpose = purpose || wallet.purpose;
  wallet.currentCreditPoints = currentCreditPoints || wallet.currentCreditPoints;
  wallet.status = typeof status === "boolean" ? status : wallet.status;
  wallet.updatedBy = req.user?._id;
  wallet.updatedAt = new Date();

  await wallet.save();

  return res.status(200).json({ success: true, data: wallet });
});

export const deleteWallet = asyncHandler(async (req, res) => {
  const wallet = await WalletModel.findById(req.params.id);
  if (!wallet) throw new ApiError(404, "Wallet not found");

  await wallet.deleteOne();

  return res.status(200).json({ success: true, message: "Wallet deleted successfully" });
});
