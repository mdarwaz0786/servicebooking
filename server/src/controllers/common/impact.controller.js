import ImpactModel from "../../models/impact.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- GET ALL IMPACTS ---------------------
export const getImpacts = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.title = { $regex: search, $options: "i" };
  }

  filters.status = true;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const impacts = await ImpactModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ImpactModel.countDocuments(filters);
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
    data: impacts,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE IMPACT ---------------------
export const getImpactById = asyncHandler(async (req, res) => {
  const impact = await ImpactModel.findOne();

  if (!impact) {
    throw new ApiError(404, "Impact not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: impact });
});
