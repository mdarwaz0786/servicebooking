import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ServicemanTimeSlot from "../../models/servicemanTimeSlot.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const monthlyStats = asyncHandler(async (req, res) => {
  let { year, month } = req.query;

  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not authenticated");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  year = parseInt(year);
  month = parseInt(month) - 1;

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

  /* ---------------- BOOKING STATUS COUNTS ---------------- */
  const bookingAgg = await ServiceManBookingModel.aggregate([
    {
      $match: {
        servicemanId: serviceman?._id,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
      }
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  console.log(bookingAgg)

  const bookingStats = {
    new: 0,
    accept: 0,
    complete: 0,
    cancel: 0,
    totalBookings: 0
  };

  bookingAgg.forEach((b) => {
    bookingStats[b?._id] = b?.count;
    bookingStats.totalBookings += b?.count;
  });

  /* ---------------- ACTIVE & LEAVE HOURS ---------------- */
  const timeAgg = await ServicemanTimeSlot.aggregate([
    {
      $match: {
        servicemanId: userId,
        date: { $gte: startOfMonth, $lte: endOfMonth }
      }
    },
    { $unwind: "$times" },
    {
      $addFields: {
        fromMin: {
          $add: [
            { $multiply: [{ $toInt: { $substr: ["$times.from", 0, 2] } }, 60] },
            { $toInt: { $substr: ["$times.from", 3, 2] } }
          ]
        },
        toMin: {
          $add: [
            { $multiply: [{ $toInt: { $substr: ["$times.to", 0, 2] } }, 60] },
            { $toInt: { $substr: ["$times.to", 3, 2] } }
          ]
        }
      }
    },
    {
      $addFields: {
        minutes: { $subtract: ["$toMin", "$fromMin"] }
      }
    },
    {
      $group: {
        _id: "$status",
        totalMinutes: { $sum: "$minutes" }
      }
    }
  ]);

  let totalActiveHours = 0;
  let totalLeaveHours = 0;

  timeAgg.forEach((t) => {
    if (t?._id === true) {
      totalActiveHours = t?.totalMinutes / 60;
    } else {
      totalLeaveHours = t?.totalMinutes / 60;
    }
  });

  /* ---------------- RESPONSE ---------------- */
  return res.status(200).json({
    success: true,
    message: "Date fetched successfully",
    year,
    month: month + 1,
    new: bookingStats.new,
    accept: bookingStats.accept,
    complete: bookingStats.complete,
    cancel: bookingStats.cancel,
    totalActiveHours: Math.round(totalActiveHours),
    totalLeaveHours: Math.round(totalLeaveHours)
  });
});
