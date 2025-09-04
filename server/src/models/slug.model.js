import mongoose from "mongoose";

const slugSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  collectionName: {
    type: String,
    required: true,
    index: true,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  pageName: {
    type: String,
    index: true,
  },
}, { timestamps: true });

slugSchema.index({ slug: 1 });
slugSchema.index({ collectionName: 1, documentId: 1 }, { unique: true });
slugSchema.index({ collectionName: 1, pageName: 1 });

const SlugModel = mongoose.model("Slug", slugSchema);

export default SlugModel;
