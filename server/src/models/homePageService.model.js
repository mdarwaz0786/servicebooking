import mongoose from "mongoose";

const homePageServiceSchema = new mongoose.Schema({
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }],
  subCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  }],
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  }],
  title: {
    type: String,
    required: [true, "Title is required"],
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
