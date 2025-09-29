import mongoose from "mongoose";

const servicemanBookingUploadSchema = new mongoose.Schema({
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManProfile",
    required: true,
  },
  servicemanBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManBooking",
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  videos: {
    type: [String],
    default: [],
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

servicemanBookingUploadSchema.index({ servicemanId: 1, servicemanBookingId: 1 });

const ServicemanBookingUploadModel = mongoose.model(
  "ServicemanBookingUpload",
  servicemanBookingUploadSchema
);

export default ServicemanBookingUploadModel;
