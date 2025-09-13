import mongoose from "mongoose";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Get data by slug
export const getDataBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  if (!slug) {
    throw new ApiError(400, "Slug is required");
  };

  const slugDoc = await SlugModel.findOne({ slug });
  if (!slugDoc) {
    throw new ApiError(400, "Slug not found");
  };

  const { collectionName, documentId } = slugDoc;

  let Model;

  try {
    Model = mongoose.model(collectionName);
  } catch (err) {
    throw new ApiError(400, `Invalid collection: ${collectionName}`);
  };

  const document = await Model.findById(documentId);
  if (!document) {
    throw new ApiError(400, "Document not found");
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    slug: slugDoc,
    data: document,
  });
});
