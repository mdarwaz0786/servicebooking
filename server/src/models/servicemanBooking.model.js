import mongoose from "mongoose";
import getCurrentIndianTime from "../utils/getCurrentIndianTime.js";

const serviceManBookingSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManProfile",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedDate: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  assignedTime: {
    type: String,
    required: true,
    default: getCurrentIndianTime,
  },
  status: {
    type: String,
    enum: ["new", "accept", "reject", "ongoing", "complete", "cancel", "partstatusnew", "partstatusconfirm", "partstatusapprove", "partstatusreject"],
    default: "new",
  },
  actionById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  selfie: {
    type: String,
  },
  startDate: {
    type: Date,
    default: null,
  },
  startTime: {
    type: String,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  endTime: {
    type: String,
    default: null,
  },
  cancelDate: {
    type: Date,
    default: null,
  },
  cancelTime: {
    type: String,
    default: null,
  },
  acceptDate: {
    type: Date,
    default: null,
  },
  acceptTime: {
    type: String,
    default: null,
  },
  rejectDate: {
    type: Date,
    default: null,
  },
  rejectTime: {
    type: String,
    default: null,
  },
  beforeStartImages: {
    type: [String],
    default: [],
  },
  beforeStartVideos: {
    type: [String],
    default: [],
  },
  afterCompleteImages: {
    type: [String],
    default: [],
  },
  afterCompleteVideos: {
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

serviceManBookingSchema.index({ bookingId: 1, servicemanId: 1, userId: 1, status: 1 });

serviceManBookingSchema.virtual("booking", {
  ref: "Booking",
  localField: "bookingId",
  foreignField: "_id",
  justOne: true
});

serviceManBookingSchema.virtual("serviceman", {
  ref: "User",
  localField: "servicemanId",
  foreignField: "_id",
  justOne: true
});

serviceManBookingSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true
});

const ServiceManBookingModel = mongoose.model("ServiceManBooking", serviceManBookingSchema);

export default ServiceManBookingModel;
