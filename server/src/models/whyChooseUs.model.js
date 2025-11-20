import mongoose from "mongoose";

const whyChooseUsSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product is required"]
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  subSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubCategory",
  },
  subSubSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubSubCategory",
  },
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
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"]
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("WhyChooseUs", whyChooseUsSchema);
