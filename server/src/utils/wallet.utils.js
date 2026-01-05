import Wallet from "../models/wallet.model.js";
import ServicemanEarningModel from "../models/servicemanEarning.model.js";
import ServiceManBookingModel from "../models/servicemanBooking.model.js";
import BookingModel from "../models/booking.model.js";
import BookingItemModel from "../models/bookingItem.model.js";
import BookingAdditionalPartModel from "../models/BookingAdditionalPart.model.js";
import SupportContent from "../models/support.model.js";
import ApiError from "../helpers/apiError.js";

// support config
export const getSupportConfig = async () => {
  const doc = await SupportContent.findOne({ status: true })
    .select("acceptCreditPoints cancelCreditPoints earningPercent")
    .lean();

  return {
    acceptCreditPoints: doc?.acceptCreditPoints || 10,
    cancelCreditPoints: doc?.cancelCreditPoints || 10,
    earningPercent: doc?.earningPercent || 15,
  };
};

// CREDIT CONFIG
// const ACCEPT_CREDIT_POINTS = 10;   // deduct
// const CANCEL_CREDIT_POINTS = 10;   // add
// const DEFAULT_EARNING_PERCENT = 15;

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
    }
  }

  return total;
};

// Ensure sufficient credit
export const ensureSufficientCredit = async (providerId) => {
  const { acceptCreditPoints } = await getSupportConfig();
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
) => {
  if (!providerId || !status) return;

  const {
    acceptCreditPoints,
    cancelCreditPoints,
  } = await getSupportConfig();

  let creditPoints = 0;
  let depositAmount = 0;
  let transactionType = "";
  let purpose = ""

  if (status === "accept") {
    creditPoints = acceptCreditPoints;
    transactionType = "Debit";
    purpose = "Deduct for accept booking";
    depositAmount = acceptCreditPoints / 0.10;

    const totalCredit = await getTotalCreditPoints(providerId);
    if (totalCredit < acceptCreditPoints) {
      throw new ApiError(403, "Low credit point");
    };
  };

  if (status === "cancel") {
    creditPoints = cancelCreditPoints;
    transactionType = "Credit";
    purpose = "Add for cancel booking";
    depositAmount = cancelCreditPoints / 0.10;
  };

  return await Wallet.create({
    providerId,
    creditPoints,
    depositAmount,
    transactionType,
    depositStatus: "Paid",
    paymentMode: "System",
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
  const additionalParts = await BookingAdditionalPartModel.find({
    bookingId: booking?._id,
    status: true,
  })
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
  const payableAmount = booking?.payableAmount || 0;
  const { earningPercent } = await getSupportConfig();
  const earningAmount = Number(((payableAmount * earningPercent) / 100).toFixed(2));

  // 8️⃣ Create earning entry
  const earning = await ServicemanEarningModel.create({
    servicemanId: actionBy,
    userId: smBooking?.userId,
    booking: booking?._id,
    servicemanBooking: smBooking?._id,
    service: serviceSnapshot,
    payableAmount,
    earningPercent,
    earningAmount,
    payoutStatus: false,
    status: true,
    createdBy: actionBy,
    updatedBy: null,
  });

  return earning;
};