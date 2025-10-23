import RefundPolicyModel from "../../models/refundPolicy.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- GET ALL REFUND POLICIES ---------------------
export const getRefundPolicies = asyncHandler(async (req, res) => {
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

  const refundPolicies = await RefundPolicyModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await RefundPolicyModel.countDocuments(filters);
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
    data: refundPolicies,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE REFUND POLICY ---------------------
export const getRefundPolicyById = asyncHandler(async (req, res) => {
  const refundPolicy = await RefundPolicyModel.findById(req.params.id).lean();

  if (!refundPolicy) {
    throw new ApiError(404, "Refund Policy not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: refundPolicy });
});
