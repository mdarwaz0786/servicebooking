import Wallet from "../models/wallet.model.js";
import ServicemanEarningModel from "../models/servicemanEarning.model.js";
import ServiceManBookingModel from "../models/servicemanBooking.model.js";
import BookingModel from "../models/booking.model.js";
import BookingItemModel from "../models/bookingItem.model.js";
import BookingAdditionalPartModel from "../models/BookingAdditionalPart.model.js";
import ApiError from "../helpers/apiError.js";

// CREDIT CONFIG
const ACCEPT_CREDIT_POINTS = 10;   // deduct
const CANCEL_CREDIT_POINTS = 10;   // add
const DEFAULT_EARNING_PERCENT = 15;

// DEPOSIT CONFIG (10% rule)
const ACCEPT_DEPOSIT_AMOUNT = ACCEPT_CREDIT_POINTS / 0.10; // 100
const CANCEL_DEPOSIT_AMOUNT = CANCEL_CREDIT_POINTS / 0.10; // 100

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
export const ensureSufficientCredit = async (providerId, ACCEPT_CREDIT_POINTS = 10) => {
  const totalCreditPoints = await getTotalCreditPoints(providerId);

  if (totalCreditPoints < ACCEPT_CREDIT_POINTS) {
    throw new ApiError(403, "Low credit point");
  };

  return true;
};

export const adjustWalletCredit = async (
  providerId,
  status, // accept | cancel
) => {
  // console.log(providerId);
  // console.log(status);
  if (!providerId || !status) return;

  let creditPoints = 0;
  let depositAmount = 0;
  let transactionType = "";
  let purpose = ""

  // ACCEPT → DEDUCT
  if (status === "accept") {
    creditPoints = ACCEPT_CREDIT_POINTS;
    transactionType = "Debit";
    purpose = "Deduct for accept booking";
    depositAmount = ACCEPT_DEPOSIT_AMOUNT;

    const totalCredit = await getTotalCreditPoints(providerId);
    if (totalCredit < ACCEPT_CREDIT_POINTS) {
      throw new ApiError(403, "Low credit point");
    };
  };

  // CANCEL → CREDIT
  if (status === "cancel") {
    creditPoints = CANCEL_CREDIT_POINTS;
    transactionType = "Credit";
    purpose = "Add for cancel booking";
    depositAmount = CANCEL_DEPOSIT_AMOUNT;
  };

  // if (!creditPoints || !depositAmount) return;

  // CREATE WALLET ENTRY
  return await Wallet.create({
    providerId,
    creditPoints,        // -10 or +10
    depositAmount,       // -100 or +100
    transactionType,     // Debit | Credit
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
  if (!servicemanId || !servicemanBookingId) return null;

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
  const bookingItems = await BookingItemModel.find({ bookingId: booking?._id })
    .populate("serviceId")
    .lean();

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
    items: bookingItems?.map((item) => ({
      serviceId: item?.serviceId,
      serviceName: item?.serviceId?.name || null,
      quantity: item?.quantity,
      mrpPrice: item?.mrpPrice,
      salePrice: item?.salePrice,
      total: item?.salePrice * item?.quantity,
    })),
    additionalParts: additionalParts?.map((part) => ({
      partId: part._id,
      partName: part.rateId?.name || null,
      quantity: part.quantity,
      rate: part.rate,
      total: part.rate * part.quantity,
    })),
  };

  // 7️⃣ Calculate earning
  const payableAmount = booking?.payableAmount || 0;
  const earningPercent = DEFAULT_EARNING_PERCENT;
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