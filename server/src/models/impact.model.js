import mongoose from "mongoose";

const impactSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Green India Team Impact",
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const ImpactModel = mongoose.model("Impact", impactSchema);

export default ImpactModel;
