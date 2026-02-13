import BankTransferModel from "../../models/bankTransfer.model.js";
import ServicemanEarningModel from "../../models/servicemanEarning.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const createBankTransfer = asyncHandler(async (req, res) => {
  const { servicemanId, transactionId, fromDate, toDate } = req.body;

  if (!servicemanId || !fromDate || !toDate) {
    throw new ApiError(400, "servicemanId, fromDate and toDate are required");
  };

  // 1️⃣ Find unpaid earnings in range
  const earnings = await ServicemanEarningModel.find({
    servicemanId,
    payoutStatus: false,
    createdAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    },
  });

  if (!earnings.length) {
    throw new ApiError(404, "No unpaid earnings found in this date range");
  };

  // 2️⃣ Calculate total
  const totalAmount = earnings.reduce(
    (sum, e) => sum + (e?.earningAmount || 0),
    0
  );

  const earningIds = earnings?.map((e) => e?._id);

  // 3️⃣ Create bank transfer
  const bankTransfer = await BankTransferModel.create({
    servicemanId,
    transactionId,
    earningId: earningIds,
    amount: totalAmount,
    fromDate,
    toDate,
    paymentStatus: "success",
    paymentMode: "online",
    createdBy: req.user?._id || null,
  });

  // 4️⃣ Mark earnings as paid
  await ServicemanEarningModel.updateMany(
    { _id: { $in: earningIds } },
    { $set: { payoutStatus: true } }
  );

  return res.status(201).json({
    success: true,
    message: "Bank transfer created successfully",
    data: bankTransfer,
  });
});

// unpaid earning amount by date range
export const getEarningAmoutByDateRange = asyncHandler(async (req, res) => {
  const { servicemanId, fromDate, toDate } = req.query;

  if (!servicemanId || !fromDate || !toDate) {
    throw new ApiError(400, "servicemanId, fromDate and toDate are required");
  };

  // 1️⃣ Find unpaid earnings in range
  const earnings = await ServicemanEarningModel.find({
    servicemanId,
    payoutStatus: false,
    createdAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    },
  });

  if (!earnings) {
    throw new ApiError(404, "No unpaid earnings found in this date range");
  };

  // 2️⃣ Calculate total
  const totalAmount = earnings.reduce(
    (sum, e) => sum + (e?.earningAmount || 0),
    0
  );

  return res.status(201).json({
    success: true,
    message: "Amount fetched successfully",
    data: totalAmount,
  });
});
