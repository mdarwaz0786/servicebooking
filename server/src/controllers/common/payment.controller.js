import crypto from "crypto";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BookingModel from "../../models/booking.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import TransactionModel from "../../models/transaction.model.js";
import WalletModel from "../../models/wallet.model.js";
import CartModel from "../../models/cart.model.js";
import AddressModel from "../../models/address.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../utils/payment.js";
import generateOtp from "../../utils/generateOpt.js";
import { createScanAndPayQr, createPaymentLink, razorpay } from "../../utils/scanAndPay.js";
import axios from "axios";
import { getCartData } from "../../utils/cart.utils.js";
import { adjustWalletCredit, calculateProviderEarningAmount, getSupportConfig } from "../../utils/wallet.utils.js";
import sendNotification from "../../utils/sendNotification.js";
import { generateInvoice } from "../../utils/generateInvoice.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";

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
      userId: userId,
      name: "Test",
      email: "Test@gmail.com",
      phone: "8285392948",
    }

    const userDataForQR = {
      userId: bookingUser.userId,
      name: bookingUser.name || bookingUser.fullName,
      email: bookingUser.email,
      contact: bookingUser.phone || bookingUser.mobile
    };

    qr = await createScanAndPayQr(
      // payableAmount,
      1,
      `BOOKING_${bookingData?.bookingId}`,
      userDataForQR,
      "Booking Payment (Scan & Pay)",
    );

    // qr = await createPaymentLink(
    //   // payableAmount,
    //   1,
    //   `BOOKING_${bookingData?.bookingId}`,
    //   userDataForQR,
    //   "Booking Payment (Scan & Pay)",
    // );
    console.log("qr", qr)
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
    referenceId: `BOOKING_${bookingData?.bookingId}`,
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
    qr,
  });
});

export const qrServe = asyncHandler(async (req, res) => {
  try {
    const shortId = req.query.imageUrl ? req.query.imageUrl.split("/").pop() : shortId; // b2PIUUsJ
    const razorpayUrl = `https://rzp.io/rzp/${shortId}`;

    const response = await axios.get(razorpayUrl, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", "inline");
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ message: "QR load failed" });
  }
});

// STEP 2: Verify Payment & Create Booking
export const verifyRazorpayBookingPayment = asyncHandler(async (req, res) => {
  const { transactionTableId, qrId, type } = req.body;
  const userId = req.user?._id;

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

  let isValid = false;

  if (type == "bookingComplete" && qrId) {
    const qrStatus = await razorpay.qrCode.fetch(qrId);
    if (qrStatus.payments_count_received > 0) {
      isValid = true;
    };
  } else {
    isValid = verifyRazorpayPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
  };

  if (!isValid) {
    await TransactionModel.findOneAndUpdate({ _id: transactionTableId }, {
      transactionId: razorpay_payment_id,
      status: "failed",
      paymentDate: new Date(),
      paymentTime: paymentTime,
    }, { new: true });

    throw new ApiError(400, "Payment verification failed");
  };

  await TransactionModel.findOneAndUpdate({ _id: transactionTableId }, {
    transactionId: razorpay_payment_id,
    status: "success",
    paymentDate: new Date(),
    paymentTime: paymentTime,
  }, { new: true });

  const transactionData = await TransactionModel.findById({ _id: transactionTableId });

  if (transactionData.productType == 'booking') {
    await BookingModel.findOneAndUpdate({ _id: transactionData.PID }, {
      paymentStatus: 1,
      paymentBy: "razorpay",
      createdBy: req.user?._id,
      opt: generateOtp(),
    }, { new: true });

    const booking = await BookingModel.findOne({ _id: transactionData?.PID });
    const address = await AddressModel.findById(booking?.addressId);
    const lat = address?.lat;
    const long = address?.long;

    const { cartProducts } = await getCartData(transactionData?.userId);
    const categoryId = cartProducts[0]?.categoryId;

    const { acceptCreditPoints } = await getSupportConfig(booking?._id);
    const serviceman = await autoAssignBooking(lat, long, categoryId, booking?.scheduleDate, booking?.scheduleTime, acceptCreditPoints);

    if (serviceman) {
      await ServiceManBookingModel.create({
        bookingId: booking?._id,
        servicemanId: serviceman?._id,
        userId,
        status: "accept",
        createdBy: userId,
      });

      await BookingModel.findByIdAndUpdate(booking?._id, {
        $set: {
          status: "accept",
        },
      });

      const status = "accept";

      await adjustWalletCredit(serviceman?.userId, status, booking?._id);

      if (serviceman?.userId) {
        await sendNotification(
          [serviceman?.userId],
          "Booking Accepted",
          "One booking is accepted to you kindly proceed furthur",
          "serviceman",
          {
            type: "bookingSameZone",
          }
        );
      }
    };

    if (!serviceman) {
      const servicemen = await autoAssignMultipleServicemen(
        categoryId,
        booking?.scheduleDate,
        booking?.scheduleTime,
        acceptCreditPoints
      );

      if (servicemen?.length) {
        const bookings = servicemen?.map((sm) => ({
          bookingId: booking?._id,
          servicemanId: sm?._id,
          userId,
          status: "new",
          createdBy: userId,
        }));

        await ServiceManBookingModel.insertMany(bookings);

        const servicemanUserIds = servicemen
          .map((sm) => sm?.userId)
          .filter(Boolean);

        await sendNotification(
          servicemanUserIds,
          "New Booking",
          "You have received a new booking kindly accept it if you can serve it",
          "serviceman",
          {
            type: "bookingOtherZone",
          }
        );
      };
    };

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

  if (type == "bookingComplete") {
    const bookingId = transactionData?.PID;

    await BookingModel.findOneAndUpdate({ _id: bookingId }, {
      paymentStatus: 1,
      paymentBy: "razorpay",
      status: "complete"
    }, { new: true });

    const serviceman = await ServiceManProfileModel.findOne({ userId: userId }).select("userId _id");
    const servicemanId = serviceman?._id;

    const latestServicemanBooking = await ServiceManBookingModel.findOne({
      bookingId: bookingId,
      servicemanId: servicemanId,
    }).sort({ createdAt: -1 });

    await ServiceManBookingModel.findByIdAndUpdate(
      latestServicemanBooking?._id,
      { status: "complete" },
      { new: true }
    );

    const paymentMode = "online";
    const servicemanBookingId = latestServicemanBooking?._id;

    await calculateProviderEarningAmount(bookingId, paymentMode, userId, servicemanBookingId);
    await generateInvoice(userId, bookingId, servicemanBookingId);
  };

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




