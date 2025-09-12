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
}, { timestamps: true });

const TimeSlotModel = mongoose.model("TimeSlot", timeSlotSchema);

export default TimeSlotModel;
