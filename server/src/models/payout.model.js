import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema({
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  earningIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServicemanEarning",
  }],
  paymentMode: {
    type: String,
    enum: ["bank", "cash"],
    default: "bank",
  },
  paidToServiceman: {
    type: Number,
    default: 0,
  },
  paidToGI: {
    type: Number,
    default: 0,
  },
  fromDate: {
    type: Date,
    default: Date.now,
  },
  toDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ["success", "fail"],
    default: "success",
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
}, { timestamps: true });

const PayoutModel = mongoose.model("Payout", payoutSchema);

export default PayoutModel;
