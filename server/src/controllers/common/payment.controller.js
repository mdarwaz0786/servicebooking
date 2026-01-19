import crypto from "crypto";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import TransactionModel from "../../models/transaction.model.js";
import WalletModel from "../../models/wallet.model.js";
import CartModel from "../../models/cart.model.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../utils/payment.js";
import generateOtp from "../../utils/generateOpt.js";
import { createScanAndPayQr } from "../../utils/scanAndPay.js";

// STEP 1: Create Razorpay Order
export const createRazorpayBookingOrder = asyncHandler(async (req, res) => {
  let { pId, type, bookingId, amount, userId } = req.body;

  let itemData, bookingData, bookingItems;
  let payableAmount = 0;
  let gstPercent = 0;
  let from = "";
  let qr;

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
  } else if (type == "bookingComplete") {
    bookingData = await BookingModel.findById(bookingId);
    bookingItems = await BookingItemModel.find({ bookingId: bookingId });
    userId = bookingData?.userId;

    itemData = bookingItems;
    amount = bookingData.amount;
    gstPercent = bookingData.gstPercent;
    payableAmount = bookingData.payableAmount;
    from = "user";

    qr = await createScanAndPayQr({
      amount: payableAmount,
      referenceId: `BOOKING_${bookingData.bookingId}`,
      customerId: userId,
      description: "Booking Payment (Scan & Pay)",
    });
  };

  const razorpayOrder = await createRazorpayOrder(payableAmount);

  let transactionDetail = await TransactionModel.create({
    bookingId: pId,
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
    referenceId: `BOOKING_${bookingData.bookingId}`,
  });

  return res.status(200).json({
    success: true,
    order: razorpayOrder,
    bookingData,
    transactionDetail,
    qrId: qr ? qr.id : null,
    qrImage: qr ? qr.image_url : null,
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
    }, { new: true });

    await CartModel.deleteMany({ "userId": transactionData.userId });
  } else if (transactionData.productType == "wallet") {
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

// Scan and pay
export const razorpayWebhook = async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json({ success: false, message: "Invalid webhook signature" });
  };

  if (req.body.event !== "payment.captured") {
    return res.status(200).json({ success: true });
  };

  const payment = req.body.payload.payment.entity;

  const paymentId = payment.id;
  const referenceId = payment.notes?.reference_id;

  if (!referenceId) {
    return res.status(200).json({ success: true });
  };

  const transaction = await TransactionModel.findOne({
    referenceId,
    status: "pending",
  });

  transaction.transactionId = paymentId;
  transaction.status = "success";
  transaction.paymentDate = new Date();
  transaction.paymentTime = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
  });

  await transaction.save();

  if (transaction.productType === "bookingComplete") {
    await BookingModel.findByIdAndUpdate(transaction.PID, {
      paymentStatus: 1,
      paymentBy: "razorpay_qr",
      opt: generateOtp,
    });

    await CartModel.deleteMany({ userId: transaction.userId });
  };

  return res.status(200).json({
    success: true,
    message: "Booking created successfully",
  });
};




