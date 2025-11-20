import mongoose from "mongoose";

const homePageBannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  mobileBanner: {
    type: String,
  },
  title: {
    type: String,
    required: false,
    trim: true,
  },
  link: {
    type: String,
    required: false,
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

const HomePageBannerModel = mongoose.model("HomePageBanner", homePageBannerSchema);

export default HomePageBannerModel;