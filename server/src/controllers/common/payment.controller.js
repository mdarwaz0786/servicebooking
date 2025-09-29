import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import TransactionModel from "../../models/transaction.model.js";
import { getCartData } from "../../utils/cart.utils.js";
import CartModel from "../../models/cart.model.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../utils/payment.js";
import generateBookingId from "../../utils/generateBookingId.js";

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// STEP 1: Create Razorpay Order
export const createRazorpayBookingOrder = asyncHandler(async (req, res) => {
  const { pId, type } = req.body;

  let itemData, bookingData, userId, bookingItems;
  if (type == 'booking') {
    // Get cart data

    bookingData = await BookingModel.findById({ _id: pId });
    bookingItems = await BookingItemModel.find({ bookingId: bookingData._id });
    userId = bookingData.userId;

    const { cartProducts, amountData } = await getCartData(userId);
    itemData = bookingItems;
  }
  else if (type == "subscription") {

  }


  // Create Razorpay order
  const razorpayOrder = await createRazorpayOrder(bookingData.payableAmount);

  // Save Transaction
  let transactionDetail = await TransactionModel.create({
    userId,
    PID: pId,
    transactionId: '',
    productName: "Booking Services",
    productType: type,
    type: 1,
    itemData: itemData,
    paymentBy: "razorpay",
    amount: bookingData.amount,
    gstPercent: bookingData.gstPercent,
    finalAmount: bookingData.payableAmount,
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
  else if (transactionData.productType == 'subscription') {

  }


  return res.status(201).json({
    success: true,
    message: "Payment successfully",
    data: {},
  });
});

