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
  totalCashCollected: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ["Company", "Provider"],
  },
  isSubmit: {
    type: Boolean,
    default: false,
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

  const lastEntry = await mongoose.model("CashCollectedLogger").findOne(
    { providerId: this.providerId },
    { totalCashCollected: 1 },
    { sort: { createdAt: -1 } }
  );

  const previousTotal = lastEntry?.totalCashCollected || 0;

  this.totalCashCollected = previousTotal + this.amount;

  next();
});

const CashCollectedLoggerModel = mongoose.model("CashCollectedLogger", cashSchema);

export default CashCollectedLoggerModel;