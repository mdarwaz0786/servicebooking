import EarningModel from "../../models/earning.model.js";
import CategoryModel from "../../models/category.model.js";
import { buildPagination } from "../../utils/pagination.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Create Earning
export const createEarning = asyncHandler(async (req, res) => {
  const {
    categoryId,
    earningHour1,
    earningPrice1,
    earningHour2,
    earningPrice2,
    earningHour3,
    earningPrice3,
    earningHour4,
    earningPrice4 } = req.body;

  if (!categoryId) throw new ApiError(400, "Category is required");

  const existingEarning = await EarningModel.findOne({ categoryId });
  if (existingEarning) {
    throw new ApiError(400, "Earning for this category already exists");
  };

  const earning = await EarningModel.create({
    categoryId,
    earningHour1,
    earningPrice1,
    earningHour2,
    earningPrice2,
    earningHour3,
    earningPrice3,
    earningHour4,
    earningPrice4,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, data: earning });
});

// Get All Earnings
export const getEarnings = asyncHandler(async (req, res) => {
  console.log("runs");
  const data = await CategoryModel.find({});
  return res.status(200).json({ succe: true, data: data })
});

// Get Single Earning by ID
export const getEarningById = asyncHandler(async (req, res) => {
  const earning = await EarningModel
    .findById(req.params.id)
    .populate("category")
    .lean();

  if (!earning) throw new ApiError(404, "Earning not found");

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: earning,
  });
});

// Update Earning
export const updateEarning = asyncHandler(async (req, res) => {
  const earning = await EarningModel.findById(req.params.id);
  if (!earning) throw new ApiError(404, "Earning not found");

  const updates = req.body;
  Object.assign(earning, updates, { updatedBy: req.user?._id });

  await earning.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: earning });
});

// Delete Earning
export const deleteEarning = asyncHandler(async (req, res) => {
  const earning = await EarningModel.findById(req.params.id);
  if (!earning) throw new ApiError(404, "Earning not found");
  await earning.deleteOne();
  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
