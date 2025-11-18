import mongoose from "mongoose";

const giPromiseSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
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
    },
  ],
}, { timestamps: true });

export default mongoose.model("GIPromise", giPromiseSchema);
