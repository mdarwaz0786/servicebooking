import PrivacyPolicyModel from "../../models/privacyPolicy.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE PRIVACY POLICY ---------------------
export const createPrivacyPolicy = asyncHandler(async (req, res) => {
  const { title, description, effectiveDate } = req.body;

  const privacyPolicy = await PrivacyPolicyModel.create({
    title,
    description,
    effectiveDate,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: privacyPolicy });
});

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

// --------------------- UPDATE PRIVACY POLICY ---------------------
export const updatePrivacyPolicy = asyncHandler(async (req, res) => {
  const { title, description, effectiveDate, status } = req.body;

  const policy = await PrivacyPolicyModel.findById(req.params.id);
  if (!policy) {
    throw new ApiError(404, "Privacy Policy not found");
  }

  policy.title = title || policy.title;
  policy.description = description || policy.description;
  policy.effectiveDate = effectiveDate || policy.effectiveDate;
  policy.status = status !== undefined ? status : policy.status;

  await policy.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: policy,
  });
});

// --------------------- DELETE PRIVACY POLICY ---------------------
export const deletePrivacyPolicy = asyncHandler(async (req, res) => {
  const policy = await PrivacyPolicyModel.findById(req.params.id);
  if (!policy) {
    throw new ApiError(404, "Privacy Policy not found");
  }

  await policy.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
