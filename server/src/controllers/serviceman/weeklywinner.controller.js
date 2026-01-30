import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const weeklyWinner = asyncHandler(async (req, res) => {
  let { year, month } = req.query;
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "User not authenticated");

  const serviceman = await ServiceManProfileModel.findOne({ userId });
  if (!serviceman) throw new ApiError(404, "Service man profile not found");

  const categoryIds = serviceman?.categoryIds;

  year = parseInt(year);
  month = parseInt(month) - 1;

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

  const weeklyWinner = await ServiceManBookingModel.aggregate([
    /* 1️⃣ MATCH MONTH */
    {
      $match: {
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      }
    },
    /* 2️⃣ ADD WEEK */
    {
      $addFields: {
        week: { $week: "$createdAt" },
        weekStart: {
          $dateTrunc: {
            date: "$createdAt",
            unit: "week",
            startOfWeek: "monday"
          }
        },
        weekEnd: {
          $dateAdd: {
            startDate: {
              $dateTrunc: {
                date: "$createdAt",
                unit: "week",
                startOfWeek: "monday"
              }
            },
            unit: "day",
            amount: 6
          }
        }
      }
    },
    /* 3️⃣ GROUP WEEK + SERVICEMAN */
    {
      $group: {
        _id: {
          week: "$week",
          weekStart: "$weekStart",
          weekEnd: "$weekEnd",
          servicemanId: "$servicemanId"
        },
        completedBookings: {
          $sum: {
            $cond: [{ $eq: ["$status", "complete"] }, 1, 0]
          }
        },
        cancelBookings: {
          $sum: {
            $cond: [{ $eq: ["$status", "cancel"] }, 1, 0]
          }
        }
      }
    },
    /* 4️⃣ JOIN SERVICEMAN */
    {
      $lookup: {
        from: "servicemanprofiles",
        localField: "_id.servicemanId",
        foreignField: "_id",
        as: "serviceman"
      }
    },
    { $unwind: "$serviceman" },
    /* 5️⃣ CATEGORY FILTER (YOUR LOGIC) */
    {
      $match: {
        "serviceman.categoryIds": categoryIds
      }
    },
    /* 6️⃣ AVG RATING */
    {
      $lookup: {
        from: "reviews",
        localField: "_id.servicemanId",
        foreignField: "servicemanId",
        as: "reviews"
      }
    },
    {
      $addFields: {
        avgRating: {
          $ifNull: [{ $avg: "$reviews.rating" }, 0]
        }
      }
    },
    /* 7️⃣ ACTIVE HOURS */
    {
      $lookup: {
        from: "servicemantimeslots",
        let: { sid: "$_id.servicemanId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$servicemanId", "$$sid"] },
                  { $gte: ["$date", startOfMonth] },
                  { $lte: ["$date", endOfMonth] }
                ]
              }
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
              _id: null,
              totalMinutes: { $sum: "$minutes" }
            }
          }
        ],
        as: "slotData"
      }
    },
    {
      $addFields: {
        activeHours: {
          $divide: [
            { $ifNull: [{ $arrayElemAt: ["$slotData.totalMinutes", 0] }, 0] },
            60
          ]
        }
      }
    },
    /* 8️⃣ PRIORITY SORT */
    {
      $sort: {
        "_id.week": 1,
        completedBookings: -1,
        avgRating: -1,
        activeHours: -1,
        cancelBookings: 1
      }
    },
    /* 9️⃣ GROUP WEEK */
    {
      $group: {
        _id: {
          week: "$_id.week",
          weekStart: "$_id.weekStart",
          weekEnd: "$_id.weekEnd"
        },
        servicemen: {
          $push: {
            servicemanId: "$serviceman._id",
            providerId: "$serviceman.servicemanId",
            name: "$serviceman.name",
            profileImage: "$serviceman.profileImage",

            completedBookings: "$completedBookings",
            avgRating: { $round: ["$avgRating", 2] },
            activeHours: { $round: ["$activeHours", 2] },
            cancelBookings: "$cancelBookings"
          }
        }
      }
    },
    /* 🔟 TOP 3 */
    {
      $project: {
        _id: 0,
        weekNumber: "$_id.week",
        weekStart: "$_id.weekStart",
        weekEnd: "$_id.weekEnd",
        winners: { $slice: ["$servicemen", 3] }
      }
    },
    { $sort: { weekNumber: 1 } }
  ]);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: weeklyWinner
  });
});
