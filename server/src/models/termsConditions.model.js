import mongoose from "mongoose";

const termsConditionsSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Terms and Conditions",
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

const TermsConditionsModel = mongoose.model("TermsCondition", termsConditionsSchema);

export default TermsConditionsModel;
