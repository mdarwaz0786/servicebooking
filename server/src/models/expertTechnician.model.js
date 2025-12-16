import mongoose from "mongoose";

const expertTechnicianSchema = new mongoose.Schema({
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
  points: [
    {
      icon: { type: String, trim: true },
      title: { type: String, trim: true },
    },
  ],
  image: {
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

expertTechnicianSchema.pre("save", async function (next) {
  const ExpertTechnician = mongoose.model("ExpertTechnician");

  const existingSet = await ExpertTechnician.findOne({
    services: { $all: this.services, $size: this.services.length },
    _id: { $ne: this._id },
  });

  if (existingSet) {
    return next(new Error("This service already exists"));
  }

  const overlapping = await ExpertTechnician.findOne({
    services: { $in: this.services },
    _id: { $ne: this._id },
  });

  if (overlapping) {
    return next(new Error("This service already exists"));
  }

  next();
});

export default mongoose.model("ExpertTechnician", expertTechnicianSchema);
