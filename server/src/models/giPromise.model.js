import mongoose from "mongoose";

const giPromiseSchema = new mongoose.Schema({
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
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("GIPromise", giPromiseSchema);
