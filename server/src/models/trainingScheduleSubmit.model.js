import mongoose from "mongoose";

const trainingScheduleSubmitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trainingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Training",
  },
  scheduleDate: {
    type: Date,
    required: false,
  },
  scheduleTime: {
    type: String,
    required: false,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManProfile",
  },
  trainingScheduleStatus: {
    type: String,
    enum: ["New", "Confirm", "Reject","Present","Absent","Fail","Complete"],
    default: "New",
  },
  remarks: {
    type: String,
    trim: true,
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
}, { timestamps: true });

const TrainingScheduleSubmitModel = mongoose.model("TrainingScheduleSubmit", trainingScheduleSubmitSchema);

export default TrainingScheduleSubmitModel;
