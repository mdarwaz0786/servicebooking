import ReviewModel from "../../models/review.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Create Review
export const createReview = asyncHandler(async (req, res) => {
  const { bookingId, rating, description } = req.body;

  if (!bookingId) throw new ApiError(400, "Booking ID is required");
  if (!rating) throw new ApiError(400, "Rating is required");

  const servicemanId = await ServiceManBookingModel.findOne({ bookingId }).sort({ createdAt: -1 }).select("servicemanId");

  const review = await ReviewModel.create({
    userId: req.user?._id,
    bookingId,
    servicemanId: servicemanId ? servicemanId?.servicemanId : null,
    rating,
    description,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, data: review });
});

// Get All Reviews
export const getReviews = asyncHandler(async (req, res) => {
  let { bookingId, status, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (bookingId) filters.bookingId = bookingId;

  filters.userId = req.user?._id;

  if (status !== undefined) filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else {
    sortOption = { createdAt: -1 };
  };

  let reviews = await ReviewModel
    .find(filters)
    .populate("user")
    .populate({
      path: "booking",
      populate: {
        path: "bookingItems",
        strictPopulate: false,
        populate: {
          path: "service",
          strictPopulate: false,
          select: "name image"
        }
      }
    })
    .populate({
      path: "servicemanId",
      strictPopulate: false,
      select: "name email profileImage",
      populate: {
        path: "userId",
        model: "User",
        strictPopulate: false,
        select: "mobile"
      }
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  reviews = reviews.map((r) => {
    if (r?.servicemanId) {
      r.serviceman = {
        _id: r?.servicemanId?._id,
        name: r?.servicemanId?.name,
        email: r?.servicemanId?.email,
        profileImage: r?.servicemanId?.profileImage,
        mobile: r?.servicemanId?.userId?.mobile || null,
      };
    } else {
      r.servicemanId = null;
    }
    delete r.servicemanId;
    return r;
  });

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

// Get Single Review
export const getReviewById = asyncHandler(async (req, res) => {
  let review = await ReviewModel
    .findOne({ _id: req.params.id, userId: req.user?._id })
    .populate("user")
    .populate({
      path: "booking",
      populate: {
        path: "bookingItems",
        strictPopulate: false,
        populate: {
          path: "service",
          strictPopulate: false,
          select: "name image"
        }
      }
    })
    .populate({
      path: "servicemanId",
      select: "name email profileImage userId",
      populate: {
        path: "userId",
        model: "User",
        select: "mobile",
      },
    })
    .lean();

  if (!review) throw new ApiError(404, "Review not found");

  if (review?.servicemanId) {
    review.serviceman = {
      _id: review?.servicemanId?._id,
      name: review?.servicemanId?.name,
      email: review?.servicemanId?.email,
      profileImage: review?.servicemanId?.profileImage,
      mobile: review?.servicemanId?.userId?.mobile || null,
    };
  } else {
    review.serviceman = null;
  };

  delete review.servicemanId;

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: review,
  });
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
