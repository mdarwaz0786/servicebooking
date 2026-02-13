import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
  name: String,
  search: String,
  geometry: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  },
  status: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

zoneSchema.index({ geometry: "2dsphere" });

export default mongoose.model("Zone", zoneSchema);
