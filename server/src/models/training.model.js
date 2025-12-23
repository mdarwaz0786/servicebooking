import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    subject: {
      type: String,
      required: [true, "Training subject is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    maxParticipant: {
      type: Number,
      required: [true, "Maximum participants is required"],
      min: [1, "Participants must be at least 1"],
    },
    description: {
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
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

trainingSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

trainingSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.firstName || update.lastName) {
    const first = update.firstName || this._update.firstName;
    const last = update.lastName || this._update.lastName;

    update.fullName = `${first} ${last}`;
  };

  next();
});

export default mongoose.model("Training", trainingSchema);
