import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import TransactionModel from "../../models/transaction.model.js";
import WalletModel from "../../models/wallet.model.js";
import { getCartData } from "../../utils/cart.utils.js";
import CartModel from "../../models/cart.model.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../utils/payment.js";
import generateBookingId from "../../utils/generateBookingId.js";

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// STEP 1: Create Razorpay Order
export const createRazorpayBookingOrder = asyncHandler(async (req, res) => {
  const { pId, type, amount, userId } = req.body;
  // const userId = req.user?._id;

  let itemData, bookingData, bookingItems;
  let payableAmount = 0;
  let gstPercent = 0;

  if (type == 'booking') {
    // Get cart data

    bookingData = await BookingModel.findById({ _id: pId });
    bookingItems = await BookingItemModel.find({ bookingId: bookingData._id });
    userId = bookingData.userId;

    const { cartProducts, amountData } = await getCartData(userId);
    itemData = bookingItems;
    amount = bookingData.amount;
    gstPercent = bookingData.gstPercent;
    payableAmount = bookingData.payableAmount;
  }
  else if (type == "wallet") {
    if (!amount || amount <= 0) {
      throw new ApiError(400, "Invalid wallet amount");
    }
    payableAmount = amount;
  }
  console.log(payableAmount)

  // Create Razorpay order
  const razorpayOrder = await createRazorpayOrder(payableAmount);

  // Save Transaction
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


  // 1. Verify Signature
  const isValid = verifyRazorpayPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });
  if (!isValid) {
    await TransactionModel.findByIdAndUpdate({ _id: transactionTableId }, {
      transactionId: razorpay_payment_id,
      status: "failed",
      paymentDate: new Date().toISOString().split("T")[0],
      paymentTime: paymentTime,
    }, { new: true });
    throw new ApiError(400, "Payment verification failed");
  }


  await TransactionModel.findByIdAndUpdate({ _id: transactionTableId }, {
    transactionId: razorpay_payment_id,
    status: "success",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentTime: paymentTime,
  }, { new: true });


  const transactionData = await TransactionModel.findById({ _id: transactionTableId });
  if (transactionData.productType == 'booking') {
    // const bookingData = await BookingModel.findById({_id:transactionData.PID});
    await BookingModel.findByIdAndUpdate({ _id: transactionData.PID }, {
      paymentStatus: 1,
      paymentBy: "razorpay",
      createdBy: req.user?._id,
      opt: "1234"
    }, { new: true })
  }
  // 🔹 WALLET FLOW (NEW)
  else if (transactionData.productType === "wallet") {
    await WalletModel.create({
      providerId: transactionData.userId, // OR servicemanId if applicable
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


  return res.status(201).json({
    success: true,
    message: "Payment successfully",
    data: {},
  });
});

