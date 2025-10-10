import mongoose from "mongoose";

const serviceIncludedSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    trim: true,
  },
  sserviceId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  titles: [
    {
      type: String,
      trim: true,
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("ServiceIncluded", serviceIncludedSchema);
