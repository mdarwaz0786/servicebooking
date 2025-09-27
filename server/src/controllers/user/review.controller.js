import ReviewModel from "../../models/review.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Create Review
export const createReview = asyncHandler(async (req, res) => {
  const { serviceId, rating, description } = req.body;

  if (!serviceId) throw new ApiError(400, "Service ID is required");
  if (!rating) throw new ApiError(400, "Rating is required");

  const existingReview = await ReviewModel.findOne({ serviceId, userId: req.user?._id });
  if (existingReview) {
    throw new ApiError(400, "You have already reviewed this service");
  };

  const review = await ReviewModel.create({
    userId: req.user?._id,
    serviceId,
    rating,
    description,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, data: review });
});

// Get All Reviews
export const getReviews = asyncHandler(async (req, res) => {
  let { serviceId, userId, status, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (serviceId) filters.serviceId = serviceId;

  filters.userId = userId || req.user?._id;

  if (status !== undefined) filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else {
    sortOption = { createdAt: -1 };
  };

  const reviews = await ReviewModel
    .find(filters)
    .populate("user")
    .populate("service")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ReviewModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: reviews,
    pagination: buildPagination({ page, limit, total }),
  });
});

//  Get Single Review
export const getReviewById = asyncHandler(async (req, res) => {
  const review = await ReviewModel
    .findOne({ _id: req.params.id, userId: req.user?._id })
    .populate("user")
    .populate("service");

  if (!review) throw new ApiError(404, "Review not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: review });
});

// Update Review
export const updateReview = asyncHandler(async (req, res) => {
  const { rating, description, status } = req.body;

  const review = await ReviewModel.findOne({ _id: req.params.id, userId: req.user?._id });
  if (!review) throw new ApiError(404, "Review not found");

  if (String(review.userId) !== String(req.user?._id)) {
    throw new ApiError(403, "You are not allowed to update this review");
  };

  review.rating = rating || review.rating;
  review.description = description || review.description;
  review.status = typeof status === "boolean" ? status : review.status;
  review.updatedBy = req.user?._id;

  await review.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: review });
});

// Delete Review
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await ReviewModel.findById(req.params.id);
  if (!review) throw new ApiError(404, "Review not found");

  if (String(review.userId) !== String(req.user?._id)) {
    throw new ApiError(403, "You are not allowed to delete this review");
  };

  await review.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
