import mongoose from "mongoose";

const bookingMediaSchema = new mongoose.Schema({
  servicemanBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  bookingItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookingItem",
    index: true,
  },
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManProfile",
  },
  mediaTimeline: {
    type: Number,
    enum: [1, 2],     // 1 = Before, 2 = After
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
  },
  media: {
    type: String,
    trim: true,
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
