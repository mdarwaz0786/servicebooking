import mongoose from "mongoose";

const areaZoneSchema = new mongoose.Schema(
  {
    localityIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locality",
        required: true,
      }
    ],
    name: {
      type: String,
      required: [true, "Area zone name is required"],
      trim: true,
      maxlength: [150, "Area zone name cannot exceed 150 characters"],
    },
    radius: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
      type: Boolean,
      default: true,
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
    },
  },
  { timestamps: true }
);

export default mongoose.model("AreaZone", areaZoneSchema);
