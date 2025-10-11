import WhyChooseUsModel from "../../models/whyChooseUs.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE WHY CHOOSE US ---------------------
export const createWhyChooseUs = asyncHandler(async (req, res) => {
  const { mainTitle, reasons, services } = req.body;

  if (!mainTitle) {
    throw new ApiError(400, "Main title is required");
  };

  let reasonsArray = [];
  if (reasons) {
    reasonsArray = typeof reasons === "string" ? JSON.parse(reasons) : reasons;
  };

  const whyChooseUs = await WhyChooseUsModel.create({
    mainTitle,
    reasons: reasonsArray,
    services,
  });

  return res.status(201).json({ success: true, data: whyChooseUs });
});

// --------------------- GET ALL WHY CHOOSE US ---------------------
export const getWhyChooseUsList = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.mainTitle = { $regex: search, $options: "i" };
  };

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const whyChooseUsList = await WhyChooseUsModel.find(filters)
    .populate("services")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await WhyChooseUsModel.countDocuments(filters);
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
    data: whyChooseUsList,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE WHY CHOOSE US ---------------------
export const getWhyChooseUsById = asyncHandler(async (req, res) => {
  const whyChooseUs = await WhyChooseUsModel.findById(req.params.id).populate("services").lean();
  if (!whyChooseUs) {
    throw new ApiError(404, "Entry not found");
  };
  return res.status(200).json({ success: true, data: whyChooseUs });
});

// --------------------- UPDATE WHY CHOOSE US ---------------------
export const updateWhyChooseUs = asyncHandler(async (req, res) => {
  const { mainTitle } = req.body

  let existingReasons = [];
  if (req.body.existingReasons) {
    try {
      existingReasons =
        typeof req.body.existingReasons === "string"
          ? JSON.parse(req.body.existingReasons)
          : req.body.existingReasons
    } catch (err) {
      throw new ApiError(400, "Invalid existingReasons format")
    };
  };

  const whyChooseUs = await WhyChooseUsModel.findById(req.params.id)
  if (!whyChooseUs) {
    throw new ApiError(404, "Entry not found")
  };

  let updatedReasons = [];

  if (existingReasons.length > 0) {
    updatedReasons = whyChooseUs.reasons.filter((r) =>
      existingReasons.some((er) => er.title === r.title && er.description === r.description)
    );
  };

  if (req.body.reasons) {
    const newReasons =
      typeof req.body.reasons === "string"
        ? JSON.parse(req.body.reasons)
        : req.body.reasons
    updatedReasons = [...updatedReasons, ...newReasons]
  };

  whyChooseUs.reasons = updatedReasons
  whyChooseUs.mainTitle = mainTitle || whyChooseUs.mainTitle

  await whyChooseUs.save()

  return res.status(200).json({
    success: true,
    message: "Why Choose Us entry updated successfully",
    data: whyChooseUs,
  });
});

// --------------------- DELETE WHY CHOOSE US ---------------------
export const deleteWhyChooseUs = asyncHandler(async (req, res) => {
  const whyChooseUs = await WhyChooseUsModel.findById(req.params.id);
  if (!whyChooseUs) {
    throw new ApiError(404, "Entry not found");
  };

  await whyChooseUs.deleteOne();

  return res.status(200).json({ success: true, message: "Entry deleted successfully" });
});
