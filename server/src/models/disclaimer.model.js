import mongoose from "mongoose";

const disclaimerSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Disclaimer",
    trim: true,
  },
  effectiveDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const DisclaimerModel = mongoose.model("Disclaimer", disclaimerSchema);

export default DisclaimerModel;
