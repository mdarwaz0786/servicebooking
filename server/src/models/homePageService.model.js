import mongoose from "mongoose";

const homePageServiceSchema = new mongoose.Schema({
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product is required"]
  }],
  subCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  }],
  subSubCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubCategory",
  }],
  subSubSubCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubSubCategory",
  }],
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: [true, "Service is required"]
  }],
  title: {
    type: String,
    required: true,
    trim: true,
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
}, { timestamps: true });

const HomePageServiceModel = mongoose.model("HomePageService", homePageServiceSchema);

export default HomePageServiceModel;
