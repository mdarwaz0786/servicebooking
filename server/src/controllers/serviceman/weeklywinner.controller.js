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

  // weekly winner
  const weeklyWinner = await ServiceManBookingModel.aggregate([

    /* 1️⃣ MATCH MONTH + COMPLETED */
    {
      $match: {
        status: "complete",
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      }
    },

    /* 2️⃣ ADD WEEK NUMBER + START + END */
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
        completedBookings: { $sum: 1 }
      }
    },

    /* 4️⃣ JOIN SERVICEMAN PROFILE */
    {
      $lookup: {
        from: "servicemanprofiles",
        localField: "_id.servicemanId",
        foreignField: "_id",
        as: "serviceman"
      }
    },
    { $unwind: "$serviceman" },

    /* 5️⃣ FILTER ONLY REQUIRED CATEGORY */
    {
      $match: {
        "serviceman.categoryIds": categoryIds   // SINGLE CATEGORY
      }
    },

    /* 6️⃣ JOIN CATEGORY */
    {
      $lookup: {
        from: "categories",
        localField: "serviceman.categoryIds",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },

    /* 7️⃣ SORT FOR RANK */
    {
      $sort: {
        "_id.week": 1,
        completedBookings: -1
      }
    },

    /* 8️⃣ GROUP WEEK + CATEGORY */
    {
      $group: {
        _id: {
          week: "$_id.week",
          weekStart: "$_id.weekStart",
          weekEnd: "$_id.weekEnd",
          categoryId: "$category._id",
          categoryName: "$category.name"
        },
        servicemen: {
          $push: {
            servicemanId: "$serviceman._id",
            providerId: "$serviceman.servicemanId",
            name: "$serviceman.name",
            profileImage: "$serviceman.profileImage",
            completedBookings: "$completedBookings"
          }
        }
      }
    },

    /* 9️⃣ TAKE TOP 3 */
    {
      $project: {
        week: "$_id.week",
        weekStart: "$_id.weekStart",
        weekEnd: "$_id.weekEnd",
        categoryId: "$_id.categoryId",
        categoryName: "$_id.categoryName",
        top3: { $slice: ["$servicemen", 3] }
      }
    },

    /* 🔟 GROUP BY WEEK */
    {
      $group: {
        _id: {
          week: "$week",
          weekStart: "$weekStart",
          weekEnd: "$weekEnd"
        },
        categoryId: { $first: "$categoryId" },
        categoryName: { $first: "$categoryName" },
        winners: { $first: "$top3" }
      }
    },

    /* 1️⃣1️⃣ FINAL SHAPE */
    {
      $project: {
        _id: 0,
        weekNumber: "$_id.week",
        weekStart: "$_id.weekStart",
        weekEnd: "$_id.weekEnd",
        categoryId: 1,
        categoryName: 1,
        winners: 1
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
