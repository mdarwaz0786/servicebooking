import mongoose from "mongoose";

const brandLogoSchema = new mongoose.Schema({
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
  icons: [
    {
      type: String,
      trim: true,
    },
  ],
  description: {
    type: String,
    trim: true,
  },
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

brandLogoSchema.pre("save", async function (next) {
  const Existing = mongoose.model("BrandLogo");

  const existingSet = await Existing.findOne({
    services: { $all: this.services, $size: this.services.length },
    _id: { $ne: this._id },
  });

  if (existingSet) {
    return next(new Error("This service already exists"));
  }

  const overlapping = await Existing.findOne({
    services: { $in: this.services },
    _id: { $ne: this._id },
  });

  if (overlapping) {
    return next(new Error("This service already exists"));
  }

  next();
});

export default mongoose.model("BrandLogo", brandLogoSchema);
