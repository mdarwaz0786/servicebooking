import mongoose from "mongoose";

const providerCertificateSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceManProfile",
      required: [true, "Provider is required"],
    },
    title: {
      type: String,
      required: [true, "Certificate title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      required: [true, "Certificate number is required"],
      trim: true,
    },
    issuedFrom: {
      type: String,
      required: [true, "Issued from is required"],
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
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: false,
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

export default mongoose.model("ProviderCertificate", providerCertificateSchema);
