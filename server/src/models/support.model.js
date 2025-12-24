import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const supportInfoSchema = new mongoose.Schema(
  {
    workingHours: String,
    quickResponseHours: String,
    officeName: String,
    address: String,
    email: String,
    phone: String,
    channels: String,
  },
  { _id: false }
);

const supportContentSchema = new mongoose.Schema(
  {
    faqs: [faqSchema],
    supportInfo: supportInfoSchema,
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

export default mongoose.model("SupportContent", supportContentSchema);
