import asyncHandler from "../../helpers/asyncHandler.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";

export const getMonthlyWeeklyCategoryWinners = asyncHandler(async (req, res) => {
  let { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({
      success: false,
      message: "Year and month are required"
    });
  }

  year = parseInt(year);
  month = parseInt(month) - 1; // JS month (0-11)

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

  const winners = await ServiceManBookingModel.aggregate([
    /* ----------------------------------------
       MATCH COMPLETED BOOKINGS IN MONTH
    ---------------------------------------- */
    {
      $match: {
        status: "complete",
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      }
    },

    /* ----------------------------------------
       ADD WEEK NUMBER
    ---------------------------------------- */
    {
      $addFields: {
        week: { $week: "$createdAt" }
      }
    },

    /* ----------------------------------------
       COUNT BOOKINGS PER
       WEEK + SERVICEMAN
    ---------------------------------------- */
    {
      $group: {
        _id: {
          week: "$week",
          servicemanId: "$servicemanId"
        },
        completedBookings: { $sum: 1 }
      }
    },

    /* ----------------------------------------
       JOIN SERVICEMAN PROFILE
    ---------------------------------------- */
    {
      $lookup: {
        from: "servicemanprofiles",
        localField: "_id.servicemanId",
        foreignField: "_id",
        as: "serviceman"
      }
    },
    { $unwind: "$serviceman" },

    /* ----------------------------------------
       UNWIND CATEGORY IDS
    ---------------------------------------- */
    {
      $unwind: "$serviceman.categoryIds"
    },

    /* ----------------------------------------
       JOIN CATEGORY
    ---------------------------------------- */
    {
      $lookup: {
        from: "categories",
        localField: "serviceman.categoryIds",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },

    /* ----------------------------------------
       SORT FOR RANKING
    ---------------------------------------- */
    {
      $sort: {
        "_id.week": 1,
        "category._id": 1,
        completedBookings: -1
      }
    },

    /* ----------------------------------------
       GROUP → WEEK + CATEGORY
       PUSH SERVICEMEN
    ---------------------------------------- */
    {
      $group: {
        _id: {
          week: "$_id.week",
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

    /* ----------------------------------------
       TAKE TOP 3 PER CATEGORY
    ---------------------------------------- */
    {
      $project: {
        week: "$_id.week",
        categoryId: "$_id.categoryId",
        categoryName: "$_id.categoryName",
        top3: { $slice: ["$servicemen", 3] }
      }
    },

    /* ----------------------------------------
       GROUP BY WEEK
    ---------------------------------------- */
    {
      $group: {
        _id: "$week",
        categories: {
          $push: {
            categoryId: "$categoryId",
            categoryName: "$categoryName",
            winners: "$top3"
          }
        }
      }
    },

    /* ----------------------------------------
       FINAL SORT
    ---------------------------------------- */
    {
      $sort: { _id: 1 }
    }
  ]);

  return res.status(200).json({
    success: true,
    year,
    month: month + 1,
    weeks: winners
  });
});
