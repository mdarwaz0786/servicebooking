import mongoose from "mongoose";

const MetaTagSchema = new mongoose.Schema(
  {
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
      default: null,
    },
    image: {
      type: String,
      trim: true,
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
