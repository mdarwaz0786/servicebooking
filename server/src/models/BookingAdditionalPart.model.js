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
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
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
    type: mongoose.Schema.Types.Mixed, // price, labour, discount
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

bookingAdditionalPartSchema.virtual("brand", {
  ref: "Brand",
  localField: "_id",
  foreignField: "brandId",
  justOne: true,
});

bookingAdditionalPartSchema.virtual("rateCard", {
  ref: "RateCard",
  localField: "_id",
  foreignField: "rateId",
  justOne: true,
});

const BookingAdditionalPartModel = mongoose.model("BookingAdditionalPart", bookingAdditionalPartSchema);

export default BookingAdditionalPartModel;
