import mongoose from "mongoose";

const combinedZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    zones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Zone",
        required: [true, "Zone is required"]
      }
    ],
    status: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }
  }, { timestamps: true });

export default mongoose.model("CombinedZone", combinedZoneSchema);