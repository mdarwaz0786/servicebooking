import mongoose from "mongoose";

const subSubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Sub-subcategory name is required"],
    trim: true,
    unique: true,
    maxlength: [100, "Sub-subcategory name must not exceed 100 characters"],
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

subSubCategorySchema.index({ name: 1 });
subSubCategorySchema.index({ categoryId: 1, subCategoryId: 1 });

subSubCategorySchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true
});

subSubCategorySchema.virtual("subCategory", {
  ref: "SubCategory",
  localField: "subCategoryId",
  foreignField: "_id",
  justOne: true
});

subSubCategorySchema.virtual("subSubSubCategories", {
  ref: "SubSubSubCategory",
  localField: "_id",
  foreignField: "subSubCategoryId",
  justOne: false
});

const SubSubCategoryModel = mongoose.model("SubSubCategory", subSubCategorySchema);

export default SubSubCategoryModel;
