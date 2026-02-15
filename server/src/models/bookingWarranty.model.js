import mongoose from "mongoose";

const bookingWarrantySchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  bookingItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookingItem",
  },
  servicemanBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManBooking",
  },
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManProfile",
  },
  isWarranty: {
    type: Number,
    enum: [0, 1],
  },
  expiryDate: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: true,
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

const BookingWarrantyModel = mongoose.model("BookingWarranty", bookingWarrantySchema);

export default BookingWarrantyModel;
