import ServicemanEarningModel from "../../models/servicemanEarning.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import ApiError from "../../helpers/apiError.js";
import mongoose from "mongoose";

// get all serviceman earning
export const getServicemanEarnings = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = req.query.sortBy || "createdAt";
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

  const { serviceman, payoutStatus } = req.query;
  const matchStage = {};

  if (serviceman) {
    if (!mongoose.Types.ObjectId.isValid(serviceman)) {
      throw new ApiError(400, "Invalid serviceman");
    };

    matchStage.servicemanId = new mongoose.Types.ObjectId(serviceman);
  };

  if (payoutStatus) {
    matchStage.payoutStatus = payoutStatus == "true" ? true : false;
  };

  const aggregation = await ServicemanEarningModel.aggregate([
    { $match: matchStage },
    {
      $facet: {
        data: [
          { $sort: { [sortBy]: sortOrder } },
          { $skip: skip },
          { $limit: limit },

          // Booking
          {
            $lookup: {
              from: "bookings",
              localField: "booking",
              foreignField: "_id",
              as: "booking",
            },
          },
          { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },

          // Serviceman booking
          {
            $lookup: {
              from: "servicemanbookings",
              localField: "servicemanBooking",
              foreignField: "_id",
              as: "servicemanBooking",
            },
          },
          { $unwind: { path: "$servicemanBooking", preserveNullAndEmptyArrays: true } },

          // Customer
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "customer",
            },
          },
          { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },

          // Serviceman profile
          {
            $lookup: {
              from: "servicemanprofiles",
              localField: "servicemanId",
              foreignField: "userId",
              as: "servicemanProfile",
            },
          },
          { $unwind: { path: "$servicemanProfile", preserveNullAndEmptyArrays: true } },

          // Projection
          {
            $project: {
              _id: 1,
              payableAmount: 1,
              earningPercent: 1,
              earningAmount: 1,
              payoutStatus: 1,
              service: 1,
              createdAt: 1,
              updatedAt: 1,

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

        // Summary (ALL records)
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

  return res.status(200).json({
    success: true,
    message: "All serviceman earnings fetched successfully",
    data: earnings,
    summary,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    pagination: buildPagination({
      page,
      limit,
      total: summary.totalRecords,
    }),
  });
});

// get serviceman earning by id
export const getServicemanEarningDetail = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { earningId } = req.params;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!mongoose.Types.ObjectId.isValid(earningId)) {
    throw new ApiError(400, "Invalid earning id");
  }

  const aggregation = await ServicemanEarningModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(earningId),
        status: true,
      },
    },
    {
      $lookup: {
        from: "servicemanprofiles",
        localField: "servicemanId",
        foreignField: "userId",
        as: "servicemanProfile",
      },
    },
    { $unwind: "$servicemanProfile" },
    {
      $match: {
        "servicemanProfile.userId": new mongoose.Types.ObjectId(userId),
      },
    },
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
      $project: {
        _id: 1,
        payableAmount: 1,
        earningPercent: 1,
        earningAmount: 1,
        payoutStatus: 1,
        service: 1,
        createdAt: 1,
        updatedAt: 1,
        createdBy: 1,
        updatedBy: 1,
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
  ]);

  const earning = aggregation[0];

  if (!earning) {
    throw new ApiError(404, "Serviceman earning not found");
  }

  return res.status(200).json({
    success: true,
    message: "Serviceman earning detail fetched successfully",
    data: earning,
  });
});

export const updateServicemanPayoutStatus = asyncHandler(async (req, res) => {
  const { earningId } = req.params;
  const userId = req.user?._id;
  const { payoutStatus } = req.body;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!mongoose.Types.ObjectId.isValid(earningId)) {
    throw new ApiError(400, "Invalid earning id");
  }

  if (typeof payoutStatus !== "boolean") {
    throw new ApiError(400, "payoutStatus must be boolean");
  }

  const updatedEarning = await ServicemanEarningModel.findOneAndUpdate(
    { _id: earningId, status: true },
    {
      $set: {
        payoutStatus,
        updatedBy: userId,
        updatedAt: new Date(),
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedEarning) {
    throw new ApiError(404, "Serviceman earning not found");
  }

  return res.status(200).json({
    success: true,
    message: "Payout status updated successfully",
    data: updatedEarning,
  });
});

