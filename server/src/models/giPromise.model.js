import mongoose from "mongoose";

const giPromiseSchema = new mongoose.Schema({
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
  titles: [
    {
      type: String,
      trim: true,
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"]
    },
  ],
}, { timestamps: true });

export default mongoose.model("GIPromise", giPromiseSchema);
