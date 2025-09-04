import mongoose from "mongoose";

const subSubSubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Sub sub sub category name is required"],
    trim: true,
    unique: true,
    maxlength: [100, "Sub sub sub category name must not exceed 100 characters"],
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
  shortDescription: {
    type: String,
    required: [true, "Short description is required"],
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
    required: [true, "Category ID is required"],
    index: true,
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: [true, "Subcategory ID is required"],
    index: true,
  },
  subSubCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubCategory",
    required: [true, "Sub sub category ID is required"],
    index: true,
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

subSubSubCategorySchema.index({ name: 1 });
subSubSubCategorySchema.index({ categoryId: 1, subCategoryId: 1, subSubCategoryId: 1 });

subSubSubCategorySchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true
});

subSubSubCategorySchema.virtual("subCategory", {
  ref: "SubCategory",
  localField: "subCategoryId",
  foreignField: "_id",
  justOne: true
});

subSubSubCategorySchema.virtual("subSubCategory", {
  ref: "SubSubCategory",
  localField: "subSubCategoryId",
  foreignField: "_id",
  justOne: true
});

const SubSubSubCategoryModel = mongoose.model("SubSubSubCategory", subSubSubCategorySchema);

export default SubSubSubCategoryModel;
