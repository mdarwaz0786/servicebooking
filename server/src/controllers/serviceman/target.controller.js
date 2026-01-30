import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const target = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not authenticated");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  let dateFilter = {};

  if (year && month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    dateFilter.createdAt = {
      $gte: startDate,
      $lt: endDate
    };
  };

  const bookingAgg = await ServiceManBookingModel.aggregate([
    {
      $match: {
        servicemanId: serviceman?._id,
        ...dateFilter
      }
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$count" },
        statuses: {
          $push: { k: "$_id", v: "$count" }
        }
      }
    },
    {
      $project: {
        _id: 0,
        bookings: {
          $mergeObjects: [
            {
              new: 0,
              accept: 0,
              reject: 0,
              ongoing: 0,
              complete: 0,
              cancel: 0,
              partstatusnew: 0,
              partstatusconfirm: 0,
              partstatusapprove: 0,
              partstatusreject: 0
            },
            { $arrayToObject: "$statuses" },
            { total: "$total" }
          ]
        }
      }
    }
  ]);

  return res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully",
    data: {
      bookings: bookingAgg[0]?.bookings || {
        total: 0,
        new: 0,
        accept: 0,
        reject: 0,
        ongoing: 0,
        complete: 0,
        cancel: 0,
        partstatusnew: 0,
        partstatusconfirm: 0,
        partstatusapprove: 0,
        partstatusreject: 0
      },
    }
  });
});


export const weeklyWinner = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not authenticated");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  let dateFilter = {};

  if (year && month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    dateFilter.createdAt = {
      $gte: startDate,
      $lt: endDate
    };
  };

  const bookingAgg = await ServiceManBookingModel.aggregate([
    {
      $match: {
        servicemanId: serviceman?._id,
        ...dateFilter
      }
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$count" },
        statuses: {
          $push: { k: "$_id", v: "$count" }
        }
      }
    },
    {
      $project: {
        _id: 0,
        bookings: {
          $mergeObjects: [
            {
              new: 0,
              accept: 0,
              reject: 0,
              ongoing: 0,
              complete: 0,
              cancel: 0,
              partstatusnew: 0,
              partstatusconfirm: 0,
              partstatusapprove: 0,
              partstatusreject: 0
            },
            { $arrayToObject: "$statuses" },
            { total: "$total" }
          ]
        }
      }
    }
  ]);

  return res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully",
    data: {},
  });
});
