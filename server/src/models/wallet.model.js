import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provider ID is required"],
    },
    creditPoints: {
      type: Number,
      default: 0,
    },
    currentCreditPoints: {
      type: Number,
      default: 0,
    },
    depositAmount: {
      type: Number,
      default: 0,
    },
    depositStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    dateOfDeposit: {
      type: Date,
      default: new Date()
    },
    paymentMode: {
      type: String,
      enum: ["Online", "Cash", "System"],
      required: [true, "Payment mode is required"],
    },
    transactionType: {
      type: String,
      enum: ["Debit", "Credit"],
      required: [true, "Transaction type is required"],
    },
    transactionId: {
      type: String,
      trim: true,
    },
    transactionNumber: {
      type: String,
      trim: true,
    },
    purpose: {
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
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

walletSchema.pre("save", function (next) {
  if (this.depositAmount > 0) {
    this.creditPoints = this.depositAmount * 0.10;
  }
  next();
});

walletSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.depositAmount !== undefined) {
    update.creditPoints = update.depositAmount * 0.10;
  }

  next();
});

walletSchema.virtual("provider", {
  ref: "ServiceManProfile",
  localField: "providerId",
  foreignField: "userId",
  justOne: true,
});

export default mongoose.model("Wallet", walletSchema);
