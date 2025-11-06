import TermsConditionsModel from "../../models/termsConditions.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE TERMS & CONDITIONS ---------------------
export const createTerms = asyncHandler(async (req, res) => {
  const { title, effectiveDate, description } = req.body;

  const terms = await TermsConditionsModel.create({
    title: title || "Terms and Conditions",
    effectiveDate,
    description,
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
    filters.title = { $regex: search, $options: "i" };
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
  // Find the first Terms & Conditions document
  const terms = await TermsConditionsModel.findOne();

  if (!terms) throw new ApiError(404, "Terms not found");

  return res.status(200).json({
    success: true,
    data: terms,
  });
});

// --------------------- UPDATE TERMS ---------------------
export const updateTerms = asyncHandler(async (req, res) => {
  const { title, effectiveDate, description, status } = req.body;

  // Check if any Terms & Conditions record already exists
  let terms = await TermsConditionsModel.findOne();
  

  if (terms) {
    // ------------------ UPDATE EXISTING ------------------
    terms.title = title || terms.title;
    terms.effectiveDate = effectiveDate || terms.effectiveDate;
    terms.description = description || terms.description;
    if (status !== undefined) terms.status = status;

    await terms.save();

    return res.status(200).json({
      success: true,
      message: "Terms & Conditions updated successfully",
      data: terms,
    });
  } else {
    // ------------------ CREATE NEW ------------------
    const newTerms = await TermsConditionsModel.create({
      title: title || "Terms and Conditions",
      effectiveDate: effectiveDate || new Date(),
      description: description || "",
      status: status !== undefined ? status : true,
    });

    return res.status(201).json({
      success: true,
      message: "Terms & Conditions created successfully",
      data: newTerms,
    });
  }
});






// --------------------- DELETE TERMS ---------------------
export const deleteTerms = asyncHandler(async (req, res) => {
  const terms = await TermsConditionsModel.findById(req.params.id);
  if (!terms) throw new ApiError(404, "Terms not found");

  await terms.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
