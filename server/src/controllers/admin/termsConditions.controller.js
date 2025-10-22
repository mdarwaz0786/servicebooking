import TermsConditionsModel from "../../models/termsConditions.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE TERMS & CONDITIONS ---------------------
export const createTerms = asyncHandler(async (req, res) => {
  const { title, introduction, effectiveDate, contentSections, contact, status } = req.body;

  if (!introduction || !effectiveDate) {
    throw new ApiError(400, "Introduction and effective date are required");
  }

  const terms = await TermsConditionsModel.create({
    title: title || "Terms and Conditions",
    introduction,
    effectiveDate,
    contentSections,
    contact,
    status,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: terms });
});

// --------------------- GET ALL TERMS ---------------------
export const getTermsList = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.introduction = { $regex: search, $options: "i" };
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const termsList = await TermsConditionsModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await TermsConditionsModel.countDocuments(filters);
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
    data: termsList,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE TERMS ---------------------
export const getTermsById = asyncHandler(async (req, res) => {
  const terms = await TermsConditionsModel.findById(req.params.id).lean();
  if (!terms) throw new ApiError(404, "Terms not found");

  return res.status(200).json({ success: true, data: terms });
});

// --------------------- UPDATE TERMS ---------------------
export const updateTerms = asyncHandler(async (req, res) => {
  const { title, introduction, effectiveDate, contentSections, contact, status } = req.body;

  const terms = await TermsConditionsModel.findById(req.params.id);
  if (!terms) throw new ApiError(404, "Terms not found");

  terms.title = title || terms.title;
  terms.introduction = introduction || terms.introduction;
  terms.effectiveDate = effectiveDate || terms.effectiveDate;
  terms.contentSections = contentSections || terms.contentSections;
  terms.contact = contact || terms.contact;
  if (status !== undefined) terms.status = status;

  await terms.save();

  return res.status(200).json({
    success: true,
    message: "Terms updated successfully",
    data: terms,
  });
});

// --------------------- DELETE TERMS ---------------------
export const deleteTerms = asyncHandler(async (req, res) => {
  const terms = await TermsConditionsModel.findById(req.params.id);
  if (!terms) throw new ApiError(404, "Terms not found");

  await terms.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
