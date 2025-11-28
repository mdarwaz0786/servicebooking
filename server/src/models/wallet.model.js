import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceManProfile",
      required: [true, "Provider ID is required"],
    },
    creditPoints: {
      type: Number,
      default: 0,
      min: [0, "Credit points cannot be negative"],
    },
    depositAmount: {
      type: Number,
      default: 0,
      min: [0, "Deposit amount cannot be negative"],
    },
    depositStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    dateOfDeposit: {
      type: Date,
      required: [true, "Date of deposit is required"],
    },
    paymentMode: {
      type: String,
      enum: ["online", "cash"],
      required: [true, "Payment mode is required"],
    },
    transactionType: {
      type: String,
      enum: ["debit", "credit"],
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
      maxlength: [200, "Purpose must not exceed 200 characters"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wallet", walletSchema);
