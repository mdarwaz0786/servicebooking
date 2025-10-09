import mongoose from "mongoose";

const whyChooseUsSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    trim: true,
  },
  reasons: [
    {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
    },
  ],
}, { timestamps: true });

export default mongoose.model("WhyChooseUs", whyChooseUsSchema);
