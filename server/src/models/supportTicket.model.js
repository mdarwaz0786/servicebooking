import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      trim: true,
      default: "12345",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    userType: {
      type: String,
      enum: ["Customer", "Provider", "Other"],
      required: [true, "User type is required"],
    },
    mobile: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    reply: {
      type: String,
      trim: true,
    },
    replyImage: {
      type: String,
      trim: true,
    },
    scheduleTicket: {
      type: Boolean,
      default: false,
    },
    ticketStatus: {
      type: String,
      enum: ["Pending", "Active", "Cancelled", "Completed"],
      default: "Pending",
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
  { timestamps: true }
);

export default mongoose.model("SupportTicket", supportTicketSchema);
