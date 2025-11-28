import mongoose from "mongoose";

const trainingAttendanceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceManProfile",
      required: [true, "Provider is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    trainingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
      required: [true, "Training is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    interviewStatus: {
      type: String,
      enum: ["Pending", "Selected", "Rejected", "Rescheduled"],
      default: "Pending",
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

export default mongoose.model("TrainingAttendance", trainingAttendanceSchema);
