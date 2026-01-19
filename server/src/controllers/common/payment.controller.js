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
import { createScanAndPayQr, createPaymentLink } from "../../utils/scanAndPay.js";

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
    bookingData = await BookingModel.findById({ _id: bookingId });
    bookingItems = await BookingItemModel.find({ bookingId: bookingId });
    userId = bookingData?.userId;

    itemData = bookingItems;
    amount = bookingData?.amount;
    gstPercent = bookingData?.gstPercent;
    payableAmount = bookingData?.payableAmount;
    from = "user";

    const bookingUser = {
      userId:userId,
      name:"Test",
      email:"Test@gmail.com",
      phone:"8285392948",
    }
    
    const userDataForQR = {
      userId: bookingUser.userId,
      name: bookingUser.name || bookingUser.fullName,
      email: bookingUser.email,
      contact: bookingUser.phone || bookingUser.mobile
    };

    qr = await createPaymentLink(
      payableAmount,
      `BOOKING_${bookingData?.bookingId}`,
      userDataForQR,
      "Booking Payment (Scan & Pay)",
    );
  };

  let razorpayOrder = await createRazorpayOrder(payableAmount);

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
    qrId: qr ? qr.id : '',
    qrImage: qr ? qr.image_url : '',
  });

  return res.status(200).json({
    success: true,
    message: "Transaction created successfully",
    order: razorpayOrder,
    bookingData,
    transactionDetail,
    qrId: qr ? qr.id : '',
    qrImage: qr ? qr.image_url : '',
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
      opt: generateOtp(),
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
  }
  else if (transactionData.productType == "bookingComplete") {
    return res.status(400).json({
      success: true,
      message: "Payment Wait..",
      data: {},
    });
  }


  return res.status(201).json({
    success: true,
    message: "Payment successfully",
    data: {},
  });
});

// Verify razorpay payment without webhook
export const verifyQrPaymentWithoutWebhook = asyncHandler(async (req, res) => {
  const { transactionId } = req.body;

  const transaction = await TransactionModel.findById(transactionId);
  if (!transaction || transaction.status !== "pending") {
    return res.status(200).json({ success: false });
  };

  if (transaction.qrId) {
    const payments = await fetchQrPayments(transaction.qrId);

    const payment = payments.items.find((p) =>
      p.status === "captured" &&
      p.amount === transaction.finalAmount * 100
    );

    if (!payment) {
      return res.status(200).json({
        success: false,
        message: "Waiting for payment",
      });
    };

    transaction.transactionId = payment.id;
    transaction.status = "success";
    transaction.paymentDate = new Date();
    transaction.paymentTime = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });

    await transaction.save();

    await BookingModel.findByIdAndUpdate(transaction.PID, {
      paymentStatus: 1,
      paymentBy: "razorpay_qr",
      otp: generateOtp(),
    });

    return res.status(200).json({
      success: true,
      message: "QR payment successful",
    });
  };

  return res.status(200).json({ success: false, message: "Payment successfull" });
});

// Verify razorpay payment by webhook
export const razorpayWebhook = async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(req.body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const event = JSON.parse(req.body.toString());

  if (event.event !== "payment.captured") {
    return res.status(200).json({ success: true });
  }

  const payment = event.payload.payment.entity;

  const referenceId = payment.notes?.reference_id;

  if (!referenceId) {
    return res.status(200).json({ success: true });
  }

  const transaction = await TransactionModel.findOne({
    referenceId,
    status: "pending",
  });

  if (!transaction) {
    return res.status(200).json({ success: true });
  }

  if (payment.amount !== transaction.finalAmount * 100) {
    return res.status(400).json({ success: false, message: "Amount mismatch" });
  }

  transaction.transactionId = payment.id;
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
      otp: generateOtp(),
    });
  };

  return res.status(200).json({
    success: true,
    message: "Payment processed successfully",
  });
};




