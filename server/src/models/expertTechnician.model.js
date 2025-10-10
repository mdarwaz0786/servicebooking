import mongoose from "mongoose";

const expertTechnicianSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    trim: true,
  },
  points: [
    {
      icon: { type: String, trim: true },
      title: { type: String, trim: true },
    },
  ],
  image: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("ExpertTechnician", expertTechnicianSchema);
