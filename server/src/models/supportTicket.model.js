import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: [true, "Ticket number is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      trim: true,
    },
    userType: {
      type: String,
      enum: ["customer", "provider", "other"],
      required: [true, "User type is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      maxlength: 15,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: 150,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    reply: {
      type: String,
      trim: true,
      default: "",
    },
    replyImage: {
      type: String,
      trim: true,
      default: "",
    },
    scheduleTicket: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SupportTicket", supportTicketSchema);
