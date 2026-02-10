import mongoose from "mongoose";

const cashSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "booking",
    required: [true, "Booking is required"],
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Provider is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  totalSubmitAmount: {
    type: Number,
    default: 0,
  },
  staus: {
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

cashSchema.virtual("profile", {
  ref: "ServiceManProfile",
  localField: "providerId",
  foreignField: "userId",
  justOne: true,
});

cashSchema.virtual("serviceman", {
  ref: "User",
  localField: "providerId",
  foreignField: "_id",
  justOne: true,
});

cashSchema.virtual("booking", {
  ref: "Booking",
  localField: "bookingId",
  foreignField: "_id",
  justOne: true,
});

cashSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const lastEntry = await mongoose.model("CashCollectedSubmit").findOne(
    { providerId: this.providerId },
    { totalSubmitAmount: 1 },
    { sort: { createdAt: -1 } }
  );

  const previousTotal = lastEntry?.totalSubmitAmount || 0;

  this.totalSubmitAmount = previousTotal + this.amount;

  next();
});

const CashCollectedSubmitModel = mongoose.model("CashCollectedSubmit", cashSchema);

export default CashCollectedSubmitModel;