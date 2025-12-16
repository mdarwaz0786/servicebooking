import mongoose from "mongoose";

const trainingScheduleSubmitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trainingScheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrainingSchedule",
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
  trainingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Training",
  },
  provider: {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categoryIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
    name: String,
    email: String,
    mobile: String,
    dob: String,
    profileImage: String,
    experienceLevel: String,
    companyName: String,
    permanentAddress: String,
    currentAddress: String,
    referenceName1: String,
    referenceMobile1: String,
    referenceName2: String,
    referenceMobile2: String,
  },
  training: {
    trainingId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subject: String,
    firstName: String,
    lastName: String,
    fullName: String,
    startDate: Date,
    startTime: String,
    endTime: String,
    location: String,
    maxParticipant: Number,
    description: String,
  },
  trainingScheduleStatus: {
    type: String,
    enum: ["New", "Confirm", "Reject", "Complete"],
    default: "New",
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
