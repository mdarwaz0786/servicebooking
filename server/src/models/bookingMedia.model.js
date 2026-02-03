import mongoose from "mongoose";

const bookingMediaSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  bookingItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookingItem",
  },
  mediaType: {
    type: String,
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

const BookingMediaModel = mongoose.model("BookingMedia", bookingMediaSchema);

export default BookingMediaModel;
