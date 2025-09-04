import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
    maxlength: [150, "Service name must not exceed 150 characters"],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    trim: true,
  },
  mrpPrice: {
    type: Number,
    required: false,
  },
  salePrice: {
    type: Number,
    required: false,
  },
  timeTaking: {
    type: String,
    required: false,
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [250, "Short description must not exceed 250 characters"],
  },
  fullDescription: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: false,
  },
  subSubCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubCategory",
    required: false,
  },
  subSubSubCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubSubCategory",
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

serviceSchema.index({ name: 1 });
serviceSchema.index({ categoryId: 1, subCategoryId: 1, subSubCategoryId: 1, subSubSubCategoryId: 1 });

const ServiceModel = mongoose.model("Service", serviceSchema);

export default ServiceModel;
