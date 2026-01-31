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
  date: {
    type: String,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
