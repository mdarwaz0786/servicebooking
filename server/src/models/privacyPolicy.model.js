import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Privacy Policy",
    trim: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  effectiveDate: {
    type: Date,
    required: true,
  },
  contentSections: [
    {
      heading: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  contact: {
    companyName: { type: String },
    address: { type: String },
    email: { type: String },
    developerName: { type: String },
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const PrivacyPolicyModel = mongoose.model("PrivacyPolicy", privacyPolicySchema);

export default PrivacyPolicyModel;
