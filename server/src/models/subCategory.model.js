import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subcategory name is required"],
    trim: true,
    unique: true,
    maxlength: [100, "Subcategory name must not exceed 100 characters"],
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

subCategorySchema.index({ name: 1 });
subCategorySchema.index({ categoryId: 1 });

subCategorySchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true
});

subCategorySchema.virtual("subSubCategories", {
  ref: "SubSubCategory",
  localField: "_id",
  foreignField: "subCategoryId",
  justOne: false
});

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

export default SubCategoryModel;
