import mongoose from "mongoose";

const servicemanCertificateSchema = new mongoose.Schema(
  {
    serviceman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceManProfile",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    certificateNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    issuedFrom: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: null,
    },
    file: {
      type: String,
      required: false,
    },
    certificateStatus: {
      type: Number, // 1 = active, 0 = inactive, 2 = expired
      enum: [0, 1, 2],
      default: 1,
      index: true,
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

const ServicemanCertificateModel = mongoose.model("ServicemanCertificate", servicemanCertificateSchema);

export default ServicemanCertificateModel;
