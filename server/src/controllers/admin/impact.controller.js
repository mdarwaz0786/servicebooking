import ImpactModel from "../../models/impact.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE IMPACT ---------------------
export const createImpact = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const impact = await ImpactModel.create({
    title,
    description,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: impact });
});

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

// --------------------- UPDATE IMPACT ---------------------
export const updateImpact = asyncHandler(async (req, res) => {
  const { title, effectiveDate, description, status } = req.body;

  // Check if any Impact record already exists
  let terms = await ImpactModel.findOne();
  

  if (terms) {
    // ------------------ UPDATE EXISTING ------------------
    terms.title = title || terms.title;
    terms.effectiveDate = effectiveDate || terms.effectiveDate;
    terms.description = description || terms.description;
    if (status !== undefined) terms.status = status;

    await terms.save();

    return res.status(200).json({
      success: true,
      message: "Impact updated successfully",
      data: terms,
    });
  } else {
    // ------------------ CREATE NEW ------------------
    const newTerms = await ImpactModel.create({
      title: title || "Impact",
      effectiveDate: effectiveDate || new Date(),
      description: description || "",
      status: status !== undefined ? status : true,
    });

    return res.status(201).json({
      success: true,
      message: "Impact created successfully",
      data: newTerms,
    });
  }
});

// --------------------- DELETE IMPACT ---------------------
export const deleteImpact = asyncHandler(async (req, res) => {
  const impact = await ImpactModel.findById(req.params.id);
  if (!impact) {
    throw new ApiError(404, "Impact not found");
  }

  await impact.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
