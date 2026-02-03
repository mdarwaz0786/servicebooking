import mongoose from "mongoose";

const bookingItemSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  mrpPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  salePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  isMediaUpload: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

bookingItemSchema.index({ addressId: 1, userId: 1, status: 1 });

bookingItemSchema.virtual("booking", {
  ref: "Booking",
  localField: "bookingId",
  foreignField: "_id",
  justOne: true
});

bookingItemSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true
});

bookingItemSchema.virtual("service", {
  ref: "Service",
  localField: "serviceId",
  foreignField: "_id",
  justOne: true
});

bookingItemSchema.virtual("bookingMedia", {
  ref: "BookingMedia",
  localField: "_id",
  foreignField: "bookingItemId",
  justOne: false,
});

bookingItemSchema.virtual("additionalParts", {
  ref: "BookingAdditionalPart",
  localField: "_id",
  foreignField: "serviceItemId",
  justOne: false,
});

const BookingItemModel = mongoose.model("BookingItem", bookingItemSchema);

export default BookingItemModel;
