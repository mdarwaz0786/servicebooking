import asyncHandler from "../../helpers/asyncHandler.js";
import BookingModel from "../../models/booking.model.js";
import ReviewModel from "../../models/review.model.js";
import ServiceModel from "../../models/service.model.js";
import UserModel from "../../models/user.model.js";

// Dahboard home controller
export const getAdminDashboard = asyncHandler(async (req, res) => {
  /* ---------------- TOTAL COUNTS ---------------- */
  const [
    totalUsers,
    totalServicemen,
    totalServices,
  ] = await Promise.all([
    UserModel.countDocuments({ role: "user" }),
    UserModel.countDocuments({ role: "serviceman" }),
    ServiceModel.countDocuments({ status: true }),
  ]);

  /* ---------------- RECENT 10 BOOKINGS ---------------- */
  const recentBookings = await BookingModel
    .find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate({ path: "user", select: "-password" })
    .lean();

  /* ---------------- TOP 5 SERVICES (BASED ON REVIEWS) ---------------- */
  const topServices = await ReviewModel.aggregate([
    {
      $match: {
        status: true,
        type: 1, // service reviews
      },
    },

    // rating per booking
    {
      $group: {
        _id: "$bookingId",
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },

    { $sort: { avgRating: -1, totalReviews: -1 } },
    { $limit: 5 },

    // booking
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "_id",
        as: "booking",
      },
    },
    { $unwind: "$booking" },

    // booking items
    {
      $lookup: {
        from: "bookingitems",
        localField: "booking._id",
        foreignField: "bookingId",
        as: "items",
      },
    },
    { $unwind: "$items" },

    // service
    {
      $lookup: {
        from: "services",
        localField: "items.serviceId",
        foreignField: "_id",
        as: "service",
      },
    },
    { $unwind: "$service" },

    /* ---------------- CATEGORY LOOKUPS ---------------- */
    {
      $lookup: {
        from: "categories",
        localField: "service.categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "subcategories",
        localField: "service.subCategoryId",
        foreignField: "_id",
        as: "subCategory",
      },
    },
    { $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "subsubcategories",
        localField: "service.subSubCategoryId",
        foreignField: "_id",
        as: "subSubCategory",
      },
    },
    { $unwind: { path: "$subSubCategory", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "subsubsubcategories",
        localField: "service.subSubSubCategoryId",
        foreignField: "_id",
        as: "subSubSubCategory",
      },
    },
    { $unwind: { path: "$subSubSubCategory", preserveNullAndEmptyArrays: true } },

    /* ---------------- FINAL SHAPE ---------------- */
    {
      $group: {
        _id: "$service._id",
        name: { $first: "$service.name" },
        image: { $first: "$service.image" },

        avgRating: { $first: "$avgRating" },
        totalReviews: { $first: "$totalReviews" },

        category: {
          $first: {
            _id: "$category._id",
            name: "$category.name",
          },
        },

        subCategory: {
          $first: {
            _id: "$subCategory._id",
            name: "$subCategory.name",
          },
        },

        subSubCategory: {
          $first: {
            _id: "$subSubCategory._id",
            name: "$subSubCategory.name",
          },
        },

        subSubSubCategory: {
          $first: {
            _id: "$subSubSubCategory._id",
            name: "$subSubSubCategory.name",
          },
        },
      },
    },

    { $sort: { avgRating: -1, totalReviews: -1 } },
  ]);

  /* ---------------- TOP 5 SERVICEMEN ---------------- */
  const topServicemen = await ReviewModel.aggregate([
    {
      $match: {
        status: true,
        servicemanId: { $ne: null },
      },
    },

    /* ---- AVG RATING PER SERVICEMAN ---- */
    {
      $group: {
        _id: "$servicemanId",
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },

    { $sort: { avgRating: -1, totalReviews: -1 } },
    { $limit: 5 },

    /* ---- SERVICEMAN PROFILE ---- */
    {
      $lookup: {
        from: "servicemanprofiles",
        localField: "_id",
        foreignField: "_id",
        as: "profile",
      },
    },
    { $unwind: "$profile" },

    /* ---- USER DETAILS ---- */
    {
      $lookup: {
        from: "users",
        localField: "profile.userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    /* ---- COMPLETED JOBS COUNT ---- */
    {
      $lookup: {
        from: "servicemanbookings",
        let: { servicemanId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$servicemanId", "$$servicemanId"] },
                  { $eq: ["$status", "complete"] },
                ],
              },
            },
          },
          { $count: "completedJobs" },
        ],
        as: "jobs",
      },
    },

    {
      $addFields: {
        completedJobs: {
          $ifNull: [{ $arrayElemAt: ["$jobs.completedJobs", 0] }, 0],
        },
      },
    },

    /* ---- FINAL SHAPE ---- */
    {
      $project: {
        _id: 1,
        avgRating: { $round: ["$avgRating", 1] },
        totalReviews: 1,
        completedJobs: 1,
        name: "$profile.name",
        profileImage: "$profile.profileImage",
        mobile: "$user.mobile",
        email: "$user.email",
      },
    },

    /* ---- FINAL SORT ---- */
    {
      $sort: {
        avgRating: -1,
        totalReviews: -1,
        completedJobs: -1,
      },
    },
  ]);

  /* ---------------- RESPONSE ---------------- */
  return res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully",
    data: {
      counts: {
        users: totalUsers,
        servicemen: totalServicemen,
        services: totalServices,
      },
      recentBookings,
      topServices,
      topServicemen,
    },
  });
});
