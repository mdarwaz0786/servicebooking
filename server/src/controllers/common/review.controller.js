import ReviewModel from "../../models/review.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- GET ALL JOB POSTINGS ---------------------
export const getReviews = asyncHandler(async (req, res) => {
  let { search, page, limit, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { description: { $regex: search, $options: "i" } },
    ];
  }

  filters.status = true;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const reviews = await ReviewModel
    .find(filters)
    .populate("booking")
    .populate("user")
    .populate("serviceman")
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

// --------------------- GET SINGLE JOB POSTING ---------------------
export const getReviewById = asyncHandler(async (req, res) => {
  const review = await ReviewModel
    .findById(req.params.id)
    .populate("booking")
    .populate("user")
    .populate("serviceman")
    .lean();

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: review });
});
