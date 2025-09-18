import mongoose from "mongoose";

const trainingScheduleSchema = new mongoose.Schema({
  scheduleDate: {
    type: Date,
    required: true,
  },
  scheduleTime: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
