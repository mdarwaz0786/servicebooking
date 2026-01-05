import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import TransactionModel from "../../models/transaction.model.js";
import WalletModel from "../../models/wallet.model.js";
import CartModel from "../../models/cart.model.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../utils/payment.js";
import generateOtp from "../../utils/generateOpt.js";

// STEP 1: Create Razorpay Order
export const createRazorpayBookingOrder = asyncHandler(async (req, res) => {
  let { pId, type, amount, userId } = req.body;

  let itemData, bookingData, bookingItems;
  let payableAmount = 0;
  let gstPercent = 0;
  let from = "";

  if (type == 'booking') {
    bookingData = await BookingModel.findById({ _id: pId });
    bookingItems = await BookingItemModel.find({ bookingId: bookingData?._id });
    userId = bookingData?.userId;

    itemData = bookingItems;
    amount = bookingData.amount;
    gstPercent = bookingData.gstPercent;
    payableAmount = bookingData.payableAmount;
    from = "user";
  } else if (type == "wallet") {
    if (!amount || amount <= 0) {
      throw new ApiError(400, "Invalid wallet amount");
    };
    payableAmount = amount;
    from = "serviceman";
  };

  const razorpayOrder = await createRazorpayOrder(payableAmount);

  let transactionDetail = await TransactionModel.create({
    userId,
    PID: pId,
    transactionId: '',
    productName: type === "wallet" ? "Wallet Recharge" : "Booking Services",
    productType: type,
    type: 1,
    itemData: itemData,
    paymentBy: "razorpay",
    amount: amount,
    gstPercent: gstPercent,
    finalAmount: payableAmount,
    status: "pending",
    paymentDate: '',
    paymentTime: '',
    from,
  });

  return res.status(200).json({
    success: true,
    order: razorpayOrder,
    bookingData,
    transactionDetail,
  });
});

// STEP 2: Verify Payment & Create Booking
export const verifyRazorpayBookingPayment = asyncHandler(async (req, res) => {
  const { transactionTableId } = req.body;

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const paymentTime = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const isValid = verifyRazorpayPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!isValid) {
    await TransactionModel.findByIdAndUpdate({ _id: transactionTableId }, {
      transactionId: razorpay_payment_id,
      status: "failed",
      paymentDate: new Date(),
      paymentTime: paymentTime,
    }, { new: true });

    throw new ApiError(400, "Payment verification failed");
  };

  await TransactionModel.findByIdAndUpdate({ _id: transactionTableId }, {
    transactionId: razorpay_payment_id,
    status: "success",
    paymentDate: new Date(),
    paymentTime: paymentTime,
  }, { new: true });

  const transactionData = await TransactionModel.findById({ _id: transactionTableId });

  if (transactionData.productType == 'booking') {
    await BookingModel.findByIdAndUpdate({ _id: transactionData.PID }, {
      paymentStatus: 1,
      paymentBy: "razorpay",
      createdBy: req.user?._id,
      opt: generateOtp,
    }, { new: true })

    await CartModel.deleteMany({ "userId": transactionData.userId });
  } else if (transactionData.productType === "wallet") {
    await WalletModel.create({
      providerId: transactionData.userId,
      depositAmount: transactionData.finalAmount,
      depositStatus: "Paid",
      dateOfDeposit: new Date(),
      paymentMode: "Online",
      transactionType: "Credit",
      transactionId: transactionData.transactionId,
      purpose: "Wallet Recharge",
      createdBy: transactionData.userId,
    });
  };

  return res.status(201).json({
    success: true,
    message: "Payment successfully",
    data: {},
  });
});

