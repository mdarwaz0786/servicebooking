import mongoose from "mongoose";

const rateCardSchema = new mongoose.Schema({
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
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: [true, "Service is required"]
  }],
  rateGroups: [{
    title: {
      type: String,
      trim: true,
    },
    rates: [{
      description: {
        type: String,
        trim: true,
      },
      serviceCharge: {
        price: {
          type: String,
          trim: true,
        },
        labourCharge: {
          type: String,
          trim: true,
        },
      },
    }],
  }],
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("RateCard", rateCardSchema);
