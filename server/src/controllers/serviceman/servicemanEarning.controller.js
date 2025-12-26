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
          {
            $lookup: {
              from: "servicemanbookings",
              localField: "servicemanBooking",
              foreignField: "_id",
              as: "servicemanBooking",
            },
          },
          { $unwind: { path: "$servicemanBooking", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "customer",
            },
          },
          { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "servicemanprofiles",
              localField: "servicemanId",
              foreignField: "userId",
              as: "servicemanProfile",
            },
          },
          { $unwind: { path: "$servicemanProfile", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              _id: 1,
              payableAmount: 1,
              earningPercent: 1,
              earningAmount: 1,
              payoutStatus: 1,
              service: 1,
              createdAt: 1,
              booking: {
                _id: "$booking._id",
                bookingId: "$booking.bookingId",
                status: "$booking.status",
                payableAmount: "$booking.payableAmount",
                scheduleDate: "$booking.scheduleDate",
                scheduleTime: "$booking.scheduleTime",
              },
              servicemanBooking: {
                _id: "$servicemanBooking._id",
                status: "$servicemanBooking.status",
                acceptDate: "$servicemanBooking.acceptDate",
                completeDate: "$servicemanBooking.endDate",
              },
              customer: {
                _id: "$customer._id",
                name: "$customer.name",
                mobile: "$customer.mobile",
              },
              serviceman: {
                _id: "$servicemanProfile._id",
                name: "$servicemanProfile.name",
                mobile: "$servicemanProfile.mobile",
              },
            },
          },
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
  const earnings = result?.data || [];
  const summary = result?.summary || {
    totalEarning: 0,
    totalPayable: 0,
    totalRecords: 0,
  };

  const totalPages = Math.ceil(summary.totalRecords / limit);

  return res.status(200).json({
    success: true,
    message: "Serviceman earnings fetched successfully",
    data: earnings,
    summary,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    pagination: buildPagination({ page, limit, total: summary.totalRecords }),
  });
});

