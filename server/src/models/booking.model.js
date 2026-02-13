import mongoose from "mongoose";
import BookingCounterModel from "./bookingCounter.model.js";
import getFinancialYear from "../utils/getfinancialYear.js";

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  financialYear: {
    type: String,
    index: true,
    required: false,
  },
  sequenceNumber: {
    type: Number,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  scheduleType: {
    type: Number, // 1 = immediate, 2 = scheduled 
    enum: [1, 2],
    required: true,
  },
  scheduleDate: {
    type: Date,
    required: true,
  },
  scheduleTime: {
    type: String, // e.g. "10:00 AM"
    required: true,
  },
  paymentMode: {
    type: String, // e.g. "cod", "online"
    required: true,
  },
  paymentBy: {
    type: String, // e.g. "razorpay", "stripe", "cash"
    required: false,
  },
  paymentStatus: {
    type: Number, // 0 = pending, 1 = paid
    enum: [0, 1],
    default: 0,
  },
  status: { // booking status 
    type: String,
    enum: ["new", "assign", "accept", "reject", "ongoing", "complete", "cancel", "taken", "partstatusnew", "partstatusconfirm", "partstatusapprove", "partstatusreject"],
    default: "new",
    index: true,
  },
  actionById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  otp: {
    type: String,
    default: "1234",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  additionalPartAmount: {
    type: Number,
    default: 0,
  },
  gstPercent: {
    type: String,
    default: 0,
  },
  gstAmount: {
    type: Number,
    default: 0,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  payableAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  isCouponUsed: {
    type: Number, // 0 = No, 1 = Yes
    enum: [0, 1],
    default: 0,
  },
  cashColletedAmount: {
    type: Number,
  },
  cashColletedSubmitAmount: {
    type: Number,
  },
  cashColletedPendingAmount: {
    type: Number,
  },
  timer: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

bookingSchema.index({ addressId: 1, userId: 1, status: 1 });

bookingSchema.pre("validate", async function (next) {
  if (this.bookingId) return next();

  const financialYear = getFinancialYear();

  const counter = await BookingCounterModel.findOneAndUpdate(
    { financialYear },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const sequenceNumber = counter.seq;

  this.financialYear = financialYear;
  this.sequenceNumber = sequenceNumber;
  this.bookingId = `GIT${String(sequenceNumber).padStart(4, "0")}/${financialYear}`;

  next();
});

bookingSchema.virtual("address", {
  ref: "Address",
  localField: "addressId",
  foreignField: "_id",
  justOne: true
});

bookingSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true
});

bookingSchema.virtual("actionBy", {
  ref: "User",
  localField: "actionById",
  foreignField: "_id",
  justOne: true
});

bookingSchema.virtual("serviceman", {
  ref: "ServiceManBooking",
  localField: "_id",
  foreignField: "bookingId",
  justOne: true,
});

bookingSchema.virtual("bookingItems", {
  ref: "BookingItem",
  localField: "_id",
  foreignField: "bookingId",
  justOne: false,
});

bookingSchema.virtual("additionalParts", {
  ref: "BookingAdditionalPart",
  localField: "_id",
  foreignField: "bookingId",
  justOne: false,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
