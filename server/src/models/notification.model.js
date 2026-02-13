import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  title: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "serviceman"],
  },
  toAll: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
  },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
