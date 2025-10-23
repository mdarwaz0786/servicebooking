import mongoose from "mongoose";

const refundPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Refund Policy",
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  effectiveDate: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const RefundPolicyModel = mongoose.model("RefundPolicy", refundPolicySchema);

export default RefundPolicyModel;
