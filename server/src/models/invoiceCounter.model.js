import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

const InvoiceCounter = mongoose.model("InvoiceCounter", counterSchema);

export default InvoiceCounter;
