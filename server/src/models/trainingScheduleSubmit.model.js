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
  type: {         // 1 = First Time, 2 = Any Time
    type: Number,
    enum: [1, 2],
    default: 1,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trainingScheduleStatus: {
    type: String,
    enum: ["New", "Reject", "Fail", "Complete", "Reschedule"],
    default: "New",
  },
  attendanceStatus: {
    type: String,
    enum: ["Present", "Absent", "Pending"],
    default: "Pending",
  },
  remarks: {
    type: String,
    trim: true,
    default: "",
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

trainingScheduleSubmitSchema.virtual("training", {
  ref: "Training",
  localField: "trainingId",
  foreignField: "_id",
  justOne: true,
});

trainingScheduleSubmitSchema.virtual("provider", {
  ref: "User",
  localField: "providerId",
  foreignField: "_id",
  justOne: true,
});

trainingScheduleSubmitSchema.virtual("profile", {
  ref: "ServiceManProfile",
  localField: "providerId",
  foreignField: "userId",
  justOne: true,
});

trainingScheduleSubmitSchema.virtual("training", {
  ref: "Training",
  localField: "trainingId",
  foreignField: "_id",
  justOne: true,
});

const TrainingScheduleSubmitModel = mongoose.model("TrainingScheduleSubmit", trainingScheduleSubmitSchema);

export default TrainingScheduleSubmitModel;
