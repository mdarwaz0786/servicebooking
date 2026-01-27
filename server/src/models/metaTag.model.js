import mongoose from "mongoose";

const MetaTagSchema = new mongoose.Schema({
  pageName: {
    type: String,
    trim: true,
    default: null,
  },
  slug: {
    type: String,
    trim: true,
    unique: [true, "Slug should be unique"],
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [100, "Meta title cannot exceed 100 characters"],
    default: null,
  },
  metaAuthor: {
    type: String,
    trim: true,
    default: null,
  },
  metaKeywords: {
    type: String,
    trim: true,
    default: null,
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [300, "Meta description cannot exceed 300 characters"],
    default: null,
  },
  image: {
    type: String,
    trim: true,
    default: null,
  },
  canonicalTag: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
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
},
  { timestamps: true }
);

const MetaTagModel = mongoose.model("MetaTag", MetaTagSchema);

export default MetaTagModel;
