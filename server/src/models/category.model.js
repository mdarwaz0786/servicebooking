import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Category name must not exceed 100 characters"],
    },
    image: {
      type: String,
      required: false,
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
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true });

categorySchema.index({ name: 1 });

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
