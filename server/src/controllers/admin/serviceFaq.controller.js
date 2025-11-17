import ServiceFaqModel from "../../models/serviceFaq.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE SERVICE FAQ ---------------------
export const createServiceFaq = asyncHandler(async (req, res) => {
  const { mainTitle, services, faqs, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  if (!mainTitle) {
    throw new ApiError(400, "Main title is required");
  }

  const serviceFaq = await ServiceFaqModel.create({
    mainTitle,
    services,
    faqs: faqs,
    category,
    subCategory,
    subSubCategory,
    subSubSubCategory
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: serviceFaq });
});

// --------------------- GET ALL SERVICE FAQS ---------------------
export const getServiceFaqs = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc", category, subCategory, subSubCategory, subSubSubCategory } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.mainTitle = { $regex: search, $options: "i" };
  }

  if (category) filters.category = category;
  if (subCategory) filters.subCategory = subCategory;
  if (subSubCategory) filters.subSubCategory = subSubCategory;
  if (subSubSubCategory) filters.subSubSubCategory = subSubSubCategory;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const faqs = await ServiceFaqModel
    .find(filters)
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ServiceFaqModel.countDocuments(filters);
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
    data: faqs,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE SERVICE FAQ ---------------------
export const getServiceFaqById = asyncHandler(async (req, res) => {
  const serviceFaq = await ServiceFaqModel
    .findById(req.params.id)
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .lean();

  if (!serviceFaq) {
    throw new ApiError(404, "Service FAQ not found");
  }

  return res.status(200).json({ success: true, data: serviceFaq });
});

// --------------------- UPDATE SERVICE FAQ ---------------------
export const updateServiceFaq = asyncHandler(async (req, res) => {
  const { mainTitle, status, services, faqs, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  const serviceFaq = await ServiceFaqModel.findById(req.params.id);
  if (!serviceFaq) {
    throw new ApiError(404, "Service FAQ not found");
  }

  serviceFaq.mainTitle = mainTitle || serviceFaq?.mainTitle;
  serviceFaq.status = status !== undefined ? status : serviceFaq?.status;
  serviceFaq.services = services || serviceFaq?.services;
  serviceFaq.category = category || serviceFaq?.category;
  serviceFaq.subCategory = subCategory || serviceFaq?.subCategory;
  serviceFaq.subSubCategory = subSubCategory || serviceFaq?.subSubCategory;
  serviceFaq.subSubSubCategory = subSubSubCategory || serviceFaq?.subSubSubCategory;
  serviceFaq.faqs = faqs || serviceFaq?.faqs;

  await serviceFaq.save();

  return res.status(200).json({
    success: true,
    message: "Service FAQ updated successfully",
    data: serviceFaq,
  });
});

// --------------------- DELETE SERVICE FAQ ---------------------
export const deleteServiceFaq = asyncHandler(async (req, res) => {
  const serviceFaq = await ServiceFaqModel.findById(req.params.id);
  if (!serviceFaq) {
    throw new ApiError(404, "Service FAQ not found");
  }

  await serviceFaq.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
