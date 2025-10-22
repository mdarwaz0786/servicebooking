import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const BlogCategoryModel = mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategoryModel;
