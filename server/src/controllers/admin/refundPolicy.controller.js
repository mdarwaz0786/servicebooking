import RefundPolicyModel from "../../models/refundPolicy.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE REFUND POLICY ---------------------
export const createRefundPolicy = asyncHandler(async (req, res) => {
  const { title, description, effectiveDate } = req.body;

  const refundPolicy = await RefundPolicyModel.create({
    title,
    description,
    effectiveDate,
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
  const refundPolicy = await RefundPolicyModel.findOne();

  if (!refundPolicy) {
    throw new ApiError(404, "Refund Policy not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: refundPolicy });
});

// --------------------- UPDATE REFUND POLICY ---------------------
export const updateRefundPolicy = asyncHandler(async (req, res) => {
  const { title, effectiveDate, description, status } = req.body;

  // Check if any Refund Policy record already exists
  let terms = await RefundPolicyModel.findOne();
  

  if (terms) {
    // ------------------ UPDATE EXISTING ------------------
    terms.title = title || terms.title;
    terms.effectiveDate = effectiveDate || terms.effectiveDate;
    terms.description = description || terms.description;
    if (status !== undefined) terms.status = status;

    await terms.save();

    return res.status(200).json({
      success: true,
      message: "Refund Policy updated successfully",
      data: terms,
    });
  } else {
    // ------------------ CREATE NEW ------------------
    const newTerms = await RefundPolicyModel.create({
      title: title || "Refund Policy",
      effectiveDate: effectiveDate || new Date(),
      description: description || "",
      status: status !== undefined ? status : true,
    });

    return res.status(201).json({
      success: true,
      message: "Refund Policy created successfully",
      data: newTerms,
    });
  }
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
