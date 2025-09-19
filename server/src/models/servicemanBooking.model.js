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
    ref: "User",
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
    enum: ["new", "accept", "reject", "ongoing", "complete", "cancel"],
    default: "new",
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

serviceManBookingSchema.index({ bookingId: 1, serviceManId: 1, userId: 1, status: 1 });

serviceManBookingSchema.virtual("booking", {
  ref: "Booking",
  localField: "bookingId",
  foreignField: "_id",
  justOne: true
});

serviceManBookingSchema.virtual("serviceman", {
  ref: "ServiceManProfile",
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
