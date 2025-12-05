import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    index: true,
  },
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManProfile",
    required: false,
    index: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, "Description must not exceed 1000 characters"],
  },
  type: {
    type: Number, // 1==service,2==company
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

reviewSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

reviewSchema.virtual("booking", {
  ref: "Booking",
  localField: "bookingId",
  foreignField: "_id",
  justOne: true,
});

reviewSchema.virtual("serviceman", {
  ref: "ServiceManProfile",
  localField: "servicemanId",
  foreignField: "_id",
  justOne: true,
});

const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel;
