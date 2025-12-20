import mongoose from "mongoose";

const bookingCounterSchema = new mongoose.Schema({
  financialYear: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const BookingCounterModel = mongoose.model("BookingCounter", bookingCounterSchema);

export default BookingCounterModel;
