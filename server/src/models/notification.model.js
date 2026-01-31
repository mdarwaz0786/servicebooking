import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  toAll: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
