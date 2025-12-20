import mongoose from "mongoose";

const trainingScheduleSchema = new mongoose.Schema({
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
  trainingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Training",
  },
  trainingScheduleStatus: {
    type: String,
    enum: ["New", "Confirm", "Reject", "Complete"],
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

trainingScheduleSchema.virtual("isNextSchedule").get(function () {
  return this.scheduleDate > new Date();
});

const TrainingScheduleModel = mongoose.model("TrainingSchedule", trainingScheduleSchema);

export default TrainingScheduleModel;
