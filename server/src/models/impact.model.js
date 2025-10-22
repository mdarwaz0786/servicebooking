import mongoose from "mongoose";

const impactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Green India Team Impact",
    trim: true,
  },
  introduction: {
    type: String,
    required: true,
    trim: true,
  },
  contentSections: [
    {
      heading: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const ImpactModel = mongoose.model("Impact", impactSchema);

export default ImpactModel;
