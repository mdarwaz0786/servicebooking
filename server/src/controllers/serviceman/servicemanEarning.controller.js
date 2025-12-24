import ServicemanEarningModel from "../../models/servicemanEarning.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const getServicemanEarnings = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not authenticated");

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const matchStage = {
    servicemanId: userId,
    status: true,
  };

  const aggregation = await ServicemanEarningModel.aggregate([
    { $match: matchStage },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: "bookings",
              localField: "booking",
              foreignField: "_id",
              as: "booking",
            },
          },
          { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },
        ],
        summary: [
          {
            $group: {
              _id: null,
              totalEarning: { $sum: "$earningAmount" },
              totalPayable: { $sum: "$payableAmount" },
              totalRecords: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        data: 1,
        summary: { $arrayElemAt: ["$summary", 0] },
      },
    },
  ]);

  const result = aggregation[0] || {};
  const earnings = result.data || [];
  const summary = result.summary || {
    totalEarning: 0,
    totalPayable: 0,
    totalRecords: 0,
  };

  const totalPages = Math.ceil(summary.totalRecords / limit);
  const total = await ServicemanEarningModel.countDocuments(matchStage)

  return res.status(200).json({
    success: true,
    message: "Serviceman earnings fetched successfully",
    data: earnings,
    summary: {
      totalEarning: summary.totalEarning,
      totalPayable: summary.totalPayable,
      totalRecords: summary.totalRecords,
    },
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    pagination: buildPagination({ page, limit, total }),
  });
});
