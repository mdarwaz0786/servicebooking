import mongoose from "mongoose";

const homePageSliderSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
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

const HomePageSliderModel = mongoose.model("HomePageSlider", homePageSliderSchema);

export default HomePageSliderModel;