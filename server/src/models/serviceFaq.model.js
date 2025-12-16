import mongoose from "mongoose";

const serviceFaqSchema = new mongoose.Schema({
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
  status: {
    type: Boolean,
    default: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Category is required"]
    },
  ],
  faqs: [
    {
      question: {
        type: String,
        required: true,
        trim: true,
      },
      answer: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
}, { timestamps: true });

serviceFaqSchema.pre("save", async function (next) {
  const Existing = mongoose.model("ServiceFaq");

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

export default mongoose.model("ServiceFaq", serviceFaqSchema);
