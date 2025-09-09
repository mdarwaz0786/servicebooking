import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
    type: String, // e.g. "10:00 AM - 12:00 PM"
    required: true,
  },
  paymentMode: {
    type: String, // e.g. "cash", "card", "upi"
    required: true,
  },
  paymentBy: {
    type: String, // e.g. "razorpay", "stripe", "cash"
    required: true,
  },
  paymentStatus: {
    type: Number, // 0 = pending, 1 = paid
    enum: [0, 1],
    default: 0,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  gstAmount: {
    type: Number,
    default: 0,
  },
  gstPercent: {
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
}, { timestamps: true });

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
