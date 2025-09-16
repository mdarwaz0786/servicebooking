import mongoose from "mongoose";

const trainingScheduleSchema = new mongoose.Schema({
  scheduledDate: {
    type: Date,
    required: true,
  },
  scheduleTime: {
    type: Number,
    required: true,
    min: 1,
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
  return this.scheduledDate > new Date();
});

const TrainingScheduleModel = mongoose.model("TrainingSchedule", trainingScheduleSchema);

export default TrainingScheduleModel;
