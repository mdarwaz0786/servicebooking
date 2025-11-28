import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogCategory",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  fullDescription: {
    type: String,
    required: false,
  },
  frontImage: {
    type: String,
    required: true,
  },
  frontImageAlt: {
    type: String,
    required: true,
  },
  detailImage: {
    type: String,
    required: false,
  },
  detailImageAlt: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  meta: {
    title: { type: String, trim: true },
    keywords: { type: String, trim: true },
    author: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;
