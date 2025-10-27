import RateCardModel from "../../models/rateCard.model.js";
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
    .populate("services")
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
  const rateCard = await RateCardModel.findById(req.params.id).populate("services");

  if (!rateCard) {
    throw new ApiError(404, "Rate card not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: rateCard,
  });
});
