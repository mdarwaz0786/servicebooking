import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BookingModel from "../../models/Booking.model.js";
import BookingItemModel from "../../models/BookingItem.model.js";
import TransactionModel from "../../models/transaction.model.js";
import { getCartData } from "../../utils/cart.utils.js";
import CartModel from "../../models/cart.model.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../utils/payment.js";
import generateBookingId from "../../utils/generateBookingId.js"

// STEP 1: Create Razorpay Order
export const createRazorpayBookingOrder = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) throw new ApiError(401, "Unauthorized: User not found");

  // Get cart data
  const { cartProducts, amountData } = await getCartData(userId);
  if (!cartProducts.length) throw new ApiError(400, "Cart is empty");

  // Create Razorpay order
  const razorpayOrder = await createRazorpayOrder(amountData.payableAmount);

  return res.status(200).json({
    success: true,
    order: razorpayOrder,
    amountData,
    cartProducts,
  });
});

// STEP 2: Verify Payment & Create Booking
export const verifyRazorpayBookingPayment = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) throw new ApiError(401, "Unauthorized: User not found");

  const {
    addressId,
    scheduleType,
    scheduleDate,
    scheduleTime,
    isCouponUsed,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  // 1. Verify Signature
  const isValid = verifyRazorpayPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });
  if (!isValid) throw new ApiError(400, "Payment verification failed");

  // 2. Get Cart Data
  const { cartProducts, amountData } = await getCartData(userId);
  if (!cartProducts.length) throw new ApiError(400, "Cart is empty");

  // 3. Generate Booking ID
  const bookingId = await generateBookingId();

  // 4. Create Booking
  const booking = await BookingModel.create({
    bookingId,
    userId,
    addressId,
    scheduleType,
    scheduleDate,
    scheduleTime,
    isCouponUsed,
    paymentMode: "online",
    paymentBy: "razorpay",
    paymentStatus: 1, // Paid
    amount: amountData.amount,
    gstAmount: amountData.gstAmount,
    gstPercent: amountData.gstPercent,
    discountAmount: amountData.discountAmount,
    payableAmount: amountData.payableAmount,
  });

  // 5. Create Booking Items
  const bookingItems = cartProducts.map((item) => ({
    bookingId: booking._id,
    userId,
    serviceId: item.serviceId,
    quantity: item.quantity,
    mrpPrice: item.mrpPrice || 0,
    salePrice: item.salePrice || 0,
  }));
  await BookingItemModel.insertMany(bookingItems);

  const paymentTime = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // 6. Save Transaction
  await TransactionModel.create({
    userId,
    PID: razorpay_order_id,
    transactionId: razorpay_payment_id,
    productName: "Booking Services",
    productType: "Service",
    type: "purchase",
    itemData: cartProducts,
    paymentBy: "razorpay",
    amount: amountData.amount,
    gstPercent: amountData.gstPercent,
    finalAmount: amountData.payableAmount,
    status: "success",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentTime: paymentTime,
  });

  // 7. Clear Cart
  // await CartModel.deleteMany({ userId });

  return res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: { booking, items: cartProducts, amountData },
  });
});

