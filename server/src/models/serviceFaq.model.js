import mongoose from "mongoose";

const serviceFaqSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  faqs: [
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
  ],
}, { timestamps: true });

export default mongoose.model("ServiceFaq", serviceFaqSchema);
