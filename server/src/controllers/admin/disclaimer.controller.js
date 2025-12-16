import DisclaimerModel from "../../models/disclaimer.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";


// --------------------- CREATE DISCLAIMER ---------------------
export const createDisclaimer = asyncHandler(async (req, res) => {
  const { title, description, effectiveDate } = req.body;

  const disclaimer = await DisclaimerModel.create({
    title,
    description,
    effectiveDate,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: disclaimer,
  });
});


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


// --------------------- UPDATE DISCLAIMER ---------------------
export const updateDisclaimer = asyncHandler(async (req, res) => {
  const { title, effectiveDate, description, status } = req.body;

  // Check if disclaimer record exists
  let disclaimer = await DisclaimerModel.findOne();

  if (disclaimer) {
    // ------------------ UPDATE EXISTING ------------------
    disclaimer.title = title || disclaimer.title;
    disclaimer.effectiveDate = effectiveDate || disclaimer.effectiveDate;
    disclaimer.description = description || disclaimer.description;
    if (status !== undefined) disclaimer.status = status;

    await disclaimer.save();

    return res.status(200).json({
      success: true,
      message: "Disclaimer updated successfully",
      data: disclaimer,
    });
  } else {
    // ------------------ CREATE NEW ------------------
    const newDisclaimer = await DisclaimerModel.create({
      title: title || "Disclaimer",
      effectiveDate: effectiveDate || new Date(),
      description: description || "",
      status: status !== undefined ? status : true,
    });

    return res.status(201).json({
      success: true,
      message: "Disclaimer created successfully",
      data: newDisclaimer,
    });
  }
});


// --------------------- DELETE DISCLAIMER ---------------------
export const deleteDisclaimer = asyncHandler(async (req, res) => {
  const disclaimer = await DisclaimerModel.findById(req.params.id);

  if (!disclaimer) {
    throw new ApiError(404, "Disclaimer not found");
  }

  await disclaimer.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
