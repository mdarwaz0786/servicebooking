import mongoose from "mongoose";

const MetaTagSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      default: null,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Slug is unique"],
    },
    metaTitle: {
      type: String,
      default: null,
      trim: true,
    },
    metaAuthor: {
      type: String,
      default: null,
      trim: true,
    },
    metaKeywords: {
      type: String,
      default: null,
      trim: true,
    },
    metaDescription: {
      type: String,
      default: null,
      trim: true,
    },
    image: {
      type: String,
      default: null,
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
