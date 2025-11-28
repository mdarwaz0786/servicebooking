import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceManProfile",
      required: [true, "Provider is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [150, "Company name cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      trim: true,
    },
    policyNumber: {
      type: String,
      required: [true, "Policy number is required"],
      trim: true,
      unique: true,
    },
    insuranceType: {
      type: String,
      required: [true, "Insurance type is required"],
      trim: true,
    },
    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    coverageDetail: {
      type: String,
      trim: true,
    },
    emergencyNumber: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: [300, "Remarks cannot exceed 300 characters"],
    },
    image: {
      type: String,
      trim: true,
    },
    isRenewed: {
      type: Boolean,
      default: false,
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

export default mongoose.model("Insurance", insuranceSchema);
