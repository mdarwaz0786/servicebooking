import mongoose from "mongoose";

const servicemanEarningSchema = new mongoose.Schema({
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    index: true,
  },
  servicemanBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManBooking",
    required: true,
    index: true,
  },
  service: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  payableAmount: {
    type: Number,
    default: 0,
  },
  earningPercent: {
    type: Number,
    default: 0,
  },
  earningAmount: {
    type: Number,
    default: 0,
  },
  payoutStatus: {
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
}, { timestamps: true });

const ServicemanEarningModel = mongoose.model("ServicemanEarning", servicemanEarningSchema);

export default ServicemanEarningModel;
