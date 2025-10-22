import RefundPolicyModel from "../../models/refundPolicy.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE REFUND POLICY ---------------------
export const createRefundPolicy = asyncHandler(async (req, res) => {
  const { title, introduction, effectiveDate, contentSections, contact } = req.body;

  if (!introduction || !effectiveDate) {
    throw new ApiError(400, "Introduction and Effective Date are required");
  }

  const refundPolicy = await RefundPolicyModel.create({
    title,
    introduction,
    effectiveDate,
    contentSections,
    contact,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: refundPolicy });
});

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

// --------------------- UPDATE REFUND POLICY ---------------------
export const updateRefundPolicy = asyncHandler(async (req, res) => {
  const { title, introduction, effectiveDate, contentSections, contact, status } = req.body;

  const refundPolicy = await RefundPolicyModel.findById(req.params.id);
  if (!refundPolicy) {
    throw new ApiError(404, "Refund Policy not found");
  }

  refundPolicy.title = title || refundPolicy.title;
  refundPolicy.introduction = introduction || refundPolicy.introduction;
  refundPolicy.effectiveDate = effectiveDate || refundPolicy.effectiveDate;
  refundPolicy.contentSections = contentSections || refundPolicy.contentSections;
  refundPolicy.contact = contact || refundPolicy.contact;
  refundPolicy.status = status !== undefined ? status : refundPolicy.status;

  await refundPolicy.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: refundPolicy,
  });
});

// --------------------- DELETE REFUND POLICY ---------------------
export const deleteRefundPolicy = asyncHandler(async (req, res) => {
  const refundPolicy = await RefundPolicyModel.findById(req.params.id);
  if (!refundPolicy) {
    throw new ApiError(404, "Refund Policy not found");
  }

  await refundPolicy.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
