import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required"],
      trim: true,
      maxlength: [120, "City name cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
      trim: true,
      maxlength: [20, "City code cannot exceed 20 characters"],
      unique: true,
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

export default mongoose.model("City", citySchema);
