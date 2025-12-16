import DisclaimerModel from "../../models/disclaimer.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";


// --------------------- GET ALL DISCLAIMERS ---------------------
export const getDisclaimers = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.title = { $regex: search, $options: "i" };
  }

  filters.status = true; // include only active

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const disclaimers = await DisclaimerModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await DisclaimerModel.countDocuments(filters);
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
    data: disclaimers,
    pagination: buildPagination({ page, limit, total }),
  });
});


// --------------------- GET SINGLE DISCLAIMER ---------------------
export const getDisclaimerById = asyncHandler(async (req, res) => {
  const disclaimer = await DisclaimerModel.findOne();

  if (!disclaimer) {
    throw new ApiError(404, "Disclaimer not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: disclaimer,
  });
});
