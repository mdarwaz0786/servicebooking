import Wallet from "../models/wallet.model.js";
import ServicemanEarningModel from "../models/servicemanEarning.model.js";
import ServiceManBookingModel from "../models/servicemanBooking.model.js";
import BookingModel from "../models/booking.model.js";
import BookingItemModel from "../models/bookingItem.model.js";
import BookingAdditionalPartModel from "../models/BookingAdditionalPart.model.js";
import SupportContent from "../models/support.model.js";
import KycModel from "../models/kyc.model.js";
import ApiError from "../helpers/apiError.js";
import mongoose from "mongoose";

// support config
export const getSupportConfig = async (bookingId) => {
  const doc = await SupportContent.findOne({ status: true })
    .select("acceptCreditPoints cancelCreditPoints earningPercent")
    .lean();

  let totalCreditPoints = null;
  let bookingObjectId = null;

  if (bookingId instanceof mongoose.Types.ObjectId) {
    bookingObjectId = bookingId;
  } else if (typeof bookingId === "string" && mongoose.Types.ObjectId.isValid(bookingId)) {
    bookingObjectId = new mongoose.Types.ObjectId(bookingId);
  };

  if (bookingObjectId) {
    const creditData = await BookingItemModel.aggregate([
      { $match: { bookingId: bookingObjectId } },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $addFields: {
          itemCreditPoints: {
            $multiply: [
              { $toDouble: "$service.creditPoint" },
              "$quantity",
            ],
          },
        },
      },
      {
        $group: {
          _id: "$bookingId",
          totalCreditPoints: { $sum: "$itemCreditPoints" },
        },
      },
    ]);

    totalCreditPoints = creditData[0]?.totalCreditPoints ?? 0;
  };

  return {
    acceptCreditPoints: totalCreditPoints !== null ? totalCreditPoints : doc?.acceptCreditPoints ?? 10,
    cancelCreditPoints: totalCreditPoints !== null ? totalCreditPoints : doc?.cancelCreditPoints ?? 10,
    earningPercent: doc?.earningPercent ?? 15,
  };
};

// Calculate provider invoice amount
export const calculateProviderInvoiceAmount = async (
  servicemanId,
  bookingId,
) => {
  if (!servicemanId || !bookingId) {
    throw new Error("servicemanId and bookingId are required");
  };

  const bookingObjectId = bookingId instanceof mongoose.Types.ObjectId ? bookingId : new mongoose.Types.ObjectId(bookingId);

  // 1️⃣ Fetch booking (for additional part amount)
  const booking = await BookingModel
    .findById(bookingObjectId)
    .select("additionalPartAmount")
    .lean();

  const additionalPartAmount = Number(booking?.additionalPartAmount || 0);

  // 2️⃣ Check provider GST eligibility
  const kyc = await KycModel.findOne({ userId: servicemanId })
    .select("gstNumber")
    .lean();

  const hasGST = Boolean(kyc?.gstNumber);
  const GST_PERCENT = 18;

  // 3️⃣ Fetch booking items with services
  const bookingItems = await BookingItemModel
    .find({ bookingId: bookingObjectId })
    .populate({ path: "service", select: "salePrice taxablePrice" })
    .lean();

  let totalSaleMinusTaxable = 0;

  for (const item of bookingItems) {
    const qty = Number(item?.quantity || 1);
    const salePrice = Number(item?.service?.salePrice || 0) * qty;
    const taxableValue = Number(item?.service?.taxablePrice || 0) * qty;

    totalSaleMinusTaxable += salePrice - taxableValue;
  };

  // 4️⃣ Calculate GST (only if provider has GST)
  const providerGST = hasGST ? ((totalSaleMinusTaxable + additionalPartAmount) * GST_PERCENT) / 100 : 0;

  // 5️⃣ Final provider invoice amount
  const totalProviderInvoiceAmount = totalSaleMinusTaxable + additionalPartAmount + providerGST;

  return Number(totalProviderInvoiceAmount?.toFixed(2));
};

// Calculate admin invoice amount
export const calculateAdminInvoiceAmount = async (bookingId) => {
  if (!bookingId) {
    throw new Error("bookingId is required");
  };

  const bookingObjectId =
    bookingId instanceof mongoose.Types.ObjectId
      ? bookingId
      : new mongoose.Types.ObjectId(bookingId);

  // 1️⃣ Fetch booking (for additional part amount)
  const booking = await BookingModel
    .findById(bookingObjectId)
    .select("additionalPartAmount")
    .lean();

  const additionalPartAmount = Number(booking?.additionalPartAmount || 0);

  // 10% of additional part amount goes to admin
  const percentOfAdditionalPartAmount = additionalPartAmount * 0.1;

  // 2️⃣ Fetch booking items with services
  const bookingItems = await BookingItemModel
    .find({ bookingId: bookingObjectId })
    .populate({ path: "service", select: "taxablePrice" })
    .lean();

  const GST_PERCENT = 18;
  let totalAdminInvoiceAmount = 0;

  for (const item of bookingItems) {
    const qty = Number(item?.quantity || 1);
    const taxableValue =
      Number(item?.service?.taxablePrice || 0) * qty;

    // GST on (taxable + 10% additional part)
    const gstAmount =
      ((taxableValue + percentOfAdditionalPartAmount) * GST_PERCENT) / 100;

    const adminTotalAmount =
      taxableValue + percentOfAdditionalPartAmount + gstAmount;

    totalAdminInvoiceAmount += adminTotalAmount;
  };

  return Number(totalAdminInvoiceAmount.toFixed(2));
};

// Calculate provider earning amount
export const calculateProviderEarningAmount = async (
  servicemanId,
  bookingId,
  paymentMode,
) => {
  if (!servicemanId || !bookingId) {
    throw new Error("servicemanId and bookingId are required");
  };

  const bookingObjectId = bookingId instanceof mongoose.Types.ObjectId ? bookingId : new mongoose.Types.ObjectId(bookingId);

  // 1️⃣ Fetch booking (for additional part amount)
  const booking = await BookingModel
    .findById(bookingObjectId)
    .select("additionalPartAmount paymentStatus paymentMode")
    .lean();

  const additionalPartAmount = Number(booking?.additionalPartAmount || 0);

  // 3️⃣ Fetch booking items with services
  const bookingItems = await BookingItemModel
    .find({ bookingId: bookingObjectId })
    .populate({ path: "service", select: "salePrice taxablePrice transactionCharge" })
    .lean();

  let totalSalePrice = 0;
  let totalTransactionCharge = 0;

  for (const item of bookingItems) {
    const qty = Number(item?.quantity || 1);
    const salePrice = Number(item?.service?.salePrice || 0) * qty;
    totalTransactionCharge = Number(item?.service?.transactionCharge || 0) * qty;

    totalSalePrice += salePrice;
  };

  const totalProviderEarningAmount = 0;
  const deductAddtionalPartPercent = 0.1;

  const deductAdditionalPartAmount = additionalPartAmount * deductAddtionalPartPercent;

  if (paymentMode?.toLowerCase() == "cash" && booking?.paymentMode == "cod") {
    totalProviderEarningAmount = totalSalePrice + (additionalPartAmount - deductAdditionalPartAmount);

    // cash collcted will be deductAdditionalPartAmount
    // payout true
  };

  if (paymentMode?.toLowerCase() == "cash" && booking?.paymentMode == "online") {
    totalProviderEarningAmount = totalSalePrice + (additionalPartAmount - deductAdditionalPartAmount) - totalTransactionCharge;
  };

  if (paymentMode?.toLowerCase() == "online" && booking?.paymentMode == "online") {
    totalProviderEarningAmount = totalSalePrice + (additionalPartAmount - deductAdditionalPartAmount) - totalTransactionCharge;

    // payout false
  };

  return Number(totalProviderEarningAmount?.toFixed(2));
};

// Get total credit points
export const getTotalCreditPoints = async (providerId) => {
  const wallets = await Wallet.find(
    { providerId, status: true },
    { creditPoints: 1, transactionType: 1 }
  ).lean();

  let total = 0;

  for (const w of wallets) {
    if (w.transactionType === "Credit") {
      total += w.creditPoints;
    } else if (w.transactionType === "Debit") {
      total -= w.creditPoints;
    };
  };

  return total;
};

// Ensure sufficient credit
export const ensureSufficientCredit = async (providerId, bookingId) => {
  const { acceptCreditPoints } = await getSupportConfig(bookingId);
  const totalCreditPoints = await getTotalCreditPoints(providerId);

  if (totalCreditPoints < acceptCreditPoints) {
    throw new ApiError(403, "Low credit points");
  };

  return true;
};

// Adjust credit point
export const adjustWalletCredit = async (
  providerId,
  status,
  bookingId,
) => {
  if (!providerId || !status || !bookingId) return;

  const previousBalance = await getTotalCreditPoints(providerId);
  let currentCreditPoints;

  const {
    acceptCreditPoints,
    cancelCreditPoints,
  } = await getSupportConfig(bookingId);

  let creditPoints = 0;
  let depositAmount = 0;
  let transactionType = "";
  let purpose = ""

  const booking = await BookingModel.findById(bookingId).select("bookingId");

  if (status == "accept") {
    creditPoints = acceptCreditPoints;
    transactionType = "Debit";
    purpose = "Deduct for accept booking";
    depositAmount = acceptCreditPoints / 0.10;

    currentCreditPoints = previousBalance - acceptCreditPoints;

    const totalCredit = await getTotalCreditPoints(providerId);
    if (totalCredit < acceptCreditPoints) {
      throw new ApiError(403, "Low credit point");
    };
  };

  if (status == "cancel") {
    creditPoints = cancelCreditPoints;
    transactionType = "Credit";
    purpose = "Add for cancel booking";
    depositAmount = cancelCreditPoints / 0.10;

    currentCreditPoints = previousBalance + cancelCreditPoints;
  };

  return await Wallet.create({
    providerId,
    bookingId: booking?.bookingId,
    creditPoints,
    depositAmount,
    transactionType,
    depositStatus: "Paid",
    paymentMode: "System",
    currentCreditPoints: currentCreditPoints,
    purpose,
    status: true,
    createdBy: providerId,
    updatedBy: providerId,
  });
};

// Serviceman earning
export const createServicemanEarning = async (
  servicemanId,
  servicemanBookingId,
  actionBy,
) => {
  if (!servicemanId || !servicemanBookingId || !actionBy) return null;

  // 1️⃣ Prevent duplicate earning entry
  const exists = await ServicemanEarningModel.findOne({
    servicemanBooking: servicemanBookingId,
    status: true,
  }).lean();
  if (exists) return exists;

  // 2️⃣ Fetch serviceman booking
  const smBooking = await ServiceManBookingModel.findOne({
    _id: servicemanBookingId,
    servicemanId,
    status: "complete",
  }).lean();

  if (!smBooking) throw new ApiError(404, "Service man booking not found or not completed");

  // 3️⃣ Fetch booking
  const booking = await BookingModel.findById(smBooking?.bookingId).lean();
  if (!booking) throw new ApiError(404, "Booking not found");

  // 4️⃣ Fetch booking items
  const bookingItems = await BookingItemModel.find({ bookingId: booking?._id }).populate("serviceId").lean();

  // 5️⃣ Fetch additional parts
  const additionalParts = await BookingAdditionalPartModel
    .find({ bookingId: booking?._id, status: true })
    .populate("rateId")
    .lean();

  // 6️⃣ Prepare service snapshot
  const serviceSnapshot = {
    bookingAmount: booking?.amount,
    additionalPartAmount: booking?.additionalPartAmount,
    gstAmount: booking?.gstAmount,
    discountAmount: booking?.discountAmount,
    totalPayableAmount: booking?.payableAmount,
    items: bookingItems,
    additionalParts: additionalParts,
    booking: booking,
    servicemanBooking: smBooking,
  };

  // 7️⃣ Calculate earning
  const payableAmount = Number(booking?.payableAmount || 0);
  const servicemanEarningAmount = await calculateProviderInvoiceAmount(servicemanId, booking?._id);
  let earningPercent = 0;

  if (payableAmount > 0) {
    earningPercent = Number(((servicemanEarningAmount / payableAmount) * 100).toFixed(2));
  };

  // 8️⃣ Create earning entry
  const earning = await ServicemanEarningModel.create({
    servicemanId: actionBy,
    userId: smBooking?.userId,
    booking: booking?._id,
    servicemanBooking: smBooking?._id,
    service: serviceSnapshot,
    payableAmount,
    earningPercent,
    earningAmount: servicemanEarningAmount,
    payoutStatus: false,
    status: true,
    createdBy: actionBy,
    updatedBy: null,
  });

  return earning;
};