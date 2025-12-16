import ReviewModel from "../../models/review.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Get All Reviews
export const getReviews = asyncHandler(async (req, res) => {
  let { bookingId, status, sort = "desc", page = 1, limit = 10 } = req.query;

  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Unauthorized");

  const servicemanProfile = await ServiceManProfileModel.findOne({ userId }).lean();
  if (!servicemanProfile) throw new ApiError(404, "Serviceman profile not found");

  const servicemanId = servicemanProfile._id;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (bookingId) filters.bookingId = bookingId;

  filters.servicemanId = servicemanId;

  filters.type = 1;

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

// Get Single Review
export const getReviewById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Unauthorized");

  const servicemanProfile = await ServiceManProfileModel.findOne({ userId }).lean();
  if (!servicemanProfile) throw new ApiError(404, "Serviceman profile not found");

  const servicemanId = servicemanProfile._id;

  const review = await ReviewModel
    .findOne({ _id: req.params.id, servicemanId, type: 1 })
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
    .lean();

  if (!review) throw new ApiError(404, "Review not found");

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: review,
  });
});
