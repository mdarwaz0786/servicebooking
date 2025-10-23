import PrivacyPolicyModel from "../../models/privacyPolicy.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- GET ALL PRIVACY POLICIES ---------------------
export const getPrivacyPolicies = asyncHandler(async (req, res) => {
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

  const policies = await PrivacyPolicyModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await PrivacyPolicyModel.countDocuments(filters);
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
    data: policies,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE PRIVACY POLICY ---------------------
export const getPrivacyPolicyById = asyncHandler(async (req, res) => {
  const policy = await PrivacyPolicyModel.findById(req.params.id).lean();

  if (!policy) {
    throw new ApiError(404, "Privacy Policy not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: policy });
});
