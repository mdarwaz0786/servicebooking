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
    channels: {
      type: String,
      default: "Email, Phone, WhatsApp, Live Chat",
    },
  },
  { _id: false }
);

const supportContentSchema = new mongoose.Schema(
  {
    faqs: [faqSchema],
    supportInfo: supportInfoSchema,
    call: {
      id: {
        type: String,
        default: "call"
      },
      label: {
        type: String,
        default: "Call Support"
      },
      icon: {
        type: String,
        default: "phone-alt"
      },
      value: {
        type: String,
        default: "+919876543210"
      },
      type: {
        type: String,
        default: "phone"
      },
    },
    email: {
      id: {
        type: String,
        default: "email"
      },
      label: {
        type: String,
        default: "Email Us"
      },
      icon: {
        type: String,
        default: "email"
      },
      value: {
        type: String,
        default: "support@serviceprovider.com"
      },
      type: {
        type: String,
        default: "email"
      },
    },
    whatsapp: {
      id: {
        type: String,
        default: "whatsapp"
      },
      label: {
        type: String,
        default: "WhatsApp"
      },
      icon: {
        type: String,
        default: "whatsapp"
      },
      value: {
        type: String,
        default: "+919876543210"
      },
      type: {
        type: String,
        default: "whatsapp"
      },
    },
    acceptCreditPoints: {
      type: Number,
      default: 10,
    },
    cancelCreditPoints: {
      type: Number,
      default: 10,
    },
    earningPercent: {
      type: Number,
      default: 15,
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

export default mongoose.model("SupportContent", supportContentSchema);
