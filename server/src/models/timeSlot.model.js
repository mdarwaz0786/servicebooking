import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String, // "10:00 AM"
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

const TimeSlotModel = mongoose.model("TimeSlot", timeSlotSchema);

export default TimeSlotModel;
