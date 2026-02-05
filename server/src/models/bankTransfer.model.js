import mongoose from "mongoose";

const bankTransferSchema = new mongoose.Schema({
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  earningId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServicemanEarning",
  }],
  amount: {
    type: Number,
    default: 0,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["success", "fail"],
    default: "success",
  },
  paymentMode: {
    type: String,
    enum: ["online", "cash"],
    default: "online",
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

const BankTransferModel = mongoose.model("BankTransfer", bankTransferSchema);

export default BankTransferModel;
