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
    maxlength: [80, "Meta title cannot exceed 80 characters"],
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
    maxlength: [180, "Meta description cannot exceed 180 characters"],
    default: null,
  },
  image: {
    type: String,
    trim: true,
    default: null,
  },
  tags: {
    type: String,
  },
  canonicalTag: {
    type: String,
    trim: true,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  address: {
    type: String,
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
}, { timestamps: true });

const MetaTagModel = mongoose.model("MetaTag", MetaTagSchema);

export default MetaTagModel;
