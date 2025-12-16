import mongoose from "mongoose";

const serviceIncludedSchema = new mongoose.Schema({
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
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"]
    },
  ],
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
}, { timestamps: true });

serviceIncludedSchema.pre("save", async function (next) {
  const Existing = mongoose.model("ServiceIncluded");

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

export default mongoose.model("ServiceIncluded", serviceIncludedSchema);
