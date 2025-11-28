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
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    dateOfDeposit: {
      type: Date,
      required: [true, "Date of deposit is required"],
    },
    paymentMode: {
      type: String,
      enum: ["Online", "Cash"],
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
  { timestamps: true }
);

export default mongoose.model("Wallet", walletSchema);
