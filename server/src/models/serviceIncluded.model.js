import mongoose from "mongoose";

const serviceIncludedSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    trim: true,
  },
  titles: [
    {
      type: String,
      trim: true,
    },
  ],
}, { timestamps: true });

export default mongoose.model("ServiceIncluded", serviceIncludedSchema);
