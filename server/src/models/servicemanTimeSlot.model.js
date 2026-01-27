import mongoose from "mongoose";
const { Schema } = mongoose;

const TimeSchema = new Schema({
  from: {
    type: String,
    required: [true, "From time is required"],
  },
  to: {
    type: String,
    required: [true, "To time is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { _id: false });

const ServicemanTimeSlotSchema = new Schema({
  servicemanId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    index: true
  },
  times: {
    type: [TimeSchema],
    required: [true, "Times is required"],
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

const ServicemanTimeSlot = mongoose.model("ServicemanTimeSlot", ServicemanTimeSlotSchema);

export default ServicemanTimeSlot;
