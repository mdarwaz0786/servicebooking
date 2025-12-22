import RateCardModel from "../../models/rateCard.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// ======================== GET ALL RATE CARDS ========================
export const getRateCards = asyncHandler(async (req, res) => {
  let {
    category,
    subCategory,
  } = req.query;

  const filters = {};

  filters.status = true;
  if (category) filters.category = category;
  if (subCategory) filters.subCategory = subCategory;

  const rateCards = await RateCardModel
    .find(filters)
    .populate("category")
    .populate("subCategory")
    .lean();

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: rateCards,
  });
});

// ======================== GET SINGLE RATE CARD ========================
export const getRateCardById = asyncHandler(async (req, res) => {
  const rateCard = await RateCardModel.findById(req.params.id)
    .populate("category")
    .populate("subCategory")
    .lean();

  if (!rateCard) {
    throw new ApiError(404, "Rate card not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: rateCard,
  });
});
