import mongoose from "mongoose";

const bookingAdditionalPartSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  groupTitle: {
    type: String,
  },
  laborCharge: {
    type: String,
  },
  rateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RateCard",
  },
  unitPrice: {
    type: String,
  },
  quantity: {
    type: String,
  },
  price: {
    type: String,
  },
  discount: {
    type: String,
  },
  oldAmount: {
    type: mongoose.Schema.Types.Mixed,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  serviceItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookingItem",
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
}, { timestamps: true });

const BookingAdditionalPartModel = mongoose.model("BookingAdditionalPart", bookingAdditionalPartSchema);

export default BookingAdditionalPartModel;
