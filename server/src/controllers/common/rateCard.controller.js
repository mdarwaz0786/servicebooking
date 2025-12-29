import RateCardModel from "../../models/rateCard.model.js";
import ServiceModel from "../../models/service.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// ======================== GET ALL RATE CARDS ========================
export const getRateCards = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { "rateGroups.title": { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  const sortOption =
    sort === "asc"
      ? { createdAt: 1 }
      : sort === "desc"
        ? { createdAt: -1 }
        : {};

  const total = await RateCardModel.countDocuments(filters);

  const rateCards = await RateCardModel.find(filters)
    .populate("category", "name image icon")
    .populate("subCategory", "name, image icon")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

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
    data: rateCards,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ======================== GET SINGLE RATE CARD ========================
export const getRateCardById = asyncHandler(async (req, res) => {
  const rateCard = await RateCardModel
    .findById(req.params.id)
    .populate("category", "name image icon")
    .populate("subCategory", "name, image icon");

  if (!rateCard) {
    throw new ApiError(404, "Rate card not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: rateCard,
  });
});

// ==================== GET RATE CARD BY SERVICE ID ====================
export const getRateCardByServiceId = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  if (!serviceId) {
    return res.status(400).json({
      success: false,
      message: "Service ID is required",
    });
  };

  const service = await ServiceModel.findById(serviceId).lean();

  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }

  let rateCard = null;

  if (service.subCategoryId) {
    rateCard = await RateCardModel.findOne({
      subCategory: service.subCategoryId
    })
      .populate("category subCategory")
      .lean();
  } else {
    rateCard = await RateCardModel.findOne({
      category: service.categoryId
    })
      .populate("category subCategory")
      .lean();
  }

  if (!rateCard) {
    return res.status(404).json({
      success: false,
      message: "No rate card found for this service",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: rateCard,
  });
});

