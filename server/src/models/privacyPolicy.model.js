import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Privacy Policy",
    trim: true,
  },
  effectiveDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const PrivacyPolicyModel = mongoose.model("PrivacyPolicy", privacyPolicySchema);

export default PrivacyPolicyModel;
