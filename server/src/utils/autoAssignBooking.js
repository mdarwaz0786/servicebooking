import ZoneModel from "../models/zone.model.js";
import Wallet from "../models/wallet.model.js";
import { convert12To24 } from "./convert12To24.js";
import CombinedZoneModel from "../models/combinedZone.model.js";

export const autoAssignBooking = async (
  lat,
  long,
  subCategoryId,
  bookingDate,
  scheduleTime,
  acceptCreditPoints,
) => {
  // Find zone
  const zone = await ZoneModel.findOne({
    status: true,
    geometry: {
      $geoIntersects: {
        $geometry: {
          type: "Point",
          coordinates: [long, lat],
        },
      },
    },
  }).select("_id");

  if (!zone) return null;

  // Find combined zone that contains this zone
  // const combinedZone = await CombinedZoneModel.findOne({
  //   status: true,
  //   zones: zone._id,
  // }).select("_id");

  // if (!combinedZone) return null;

  const bookingTime24 = convert12To24(scheduleTime);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const servicemen = await Wallet.aggregate([
    // 1️⃣ Active wallets
    { $match: { status: true } },

    // 2️⃣ Latest wallet per provider
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$providerId",
        latestWallet: { $first: "$$ROOT" },
      },
    },

    // 3️⃣ Credit points condition
    {
      $match: {
        "latestWallet.currentCreditPoints": { $gt: acceptCreditPoints },
      },
    },

    // 4️⃣ Serviceman profile
    {
      $lookup: {
        from: "servicemanprofiles",
        localField: "_id",
        foreignField: "userId",
        as: "serviceman",
      },
    },
    { $unwind: "$serviceman" },

    // 5️⃣ Zone + category
    {
      $match: {
        "serviceman.zones": zone?._id,
        "serviceman.subCategoryIds": subCategoryId,
      },
    },

    // 6️⃣ KYC approved
    {
      $lookup: {
        from: "kycs",
        localField: "_id",
        foreignField: "userId",
        as: "kyc",
      },
    },
    { $unwind: "$kyc" },
    { $match: { "kyc.status": "approved" } },

    // 7️⃣ Training attendance
    {
      $lookup: {
        from: "trainingschedulesubmits",
        let: { providerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$providerId", "$$providerId"] },
                  { $eq: ["$type", 1] },
                  { $eq: ["$attendanceStatus", "Present"] },
                  { $eq: ["$status", true] },
                ],
              },
            },
          },
          { $limit: 1 },
        ],
        as: "trainingAttendance",
      },
    },
    { $match: { trainingAttendance: { $ne: [] } } },

    // 8️⃣ Time slot availability
    {
      $lookup: {
        from: "servicemantimeslots",
        let: {
          providerId: "$_id",
          bookingDate: new Date(bookingDate),
          bookingTime: bookingTime24,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$servicemanId", "$$providerId"] },
                  { $eq: ["$status", true] },
                  {
                    $eq: [
                      { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                      { $dateToString: { format: "%Y-%m-%d", date: "$$bookingDate" } },
                    ],
                  },
                ],
              },
            },
          },
          { $unwind: "$times" },
          {
            $match: {
              $expr: {
                $and: [
                  { $lte: ["$times.from", "$$bookingTime"] },
                  { $gte: ["$times.to", "$$bookingTime"] },
                ],
              },
            },
          },
        ],
        as: "availableSlot",
      },
    },
    { $match: { availableSlot: { $ne: [] } } },

    // 9️⃣ Cash in hand calculation
    {
      $lookup: {
        from: "cashcollectedloggers",
        let: { providerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$providerId", "$$providerId"] }
            }
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 }
        ],
        as: "cashCollected"
      }
    },

    {
      $lookup: {
        from: "cashcollectedsubmits",
        let: { providerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$providerId", "$$providerId"] }
            }
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 }
        ],
        as: "cashSubmitted"
      }
    },

    {
      $addFields: {
        totalCashCollected: {
          $ifNull: [{ $arrayElemAt: ["$cashCollected.totalCashCollected", 0] }, 0]
        },
        totalSubmitAmount: {
          $ifNull: [{ $arrayElemAt: ["$cashSubmitted.totalSubmitAmount", 0] }, 0]
        }
      }
    },

    {
      $addFields: {
        cashInHand: {
          $subtract: ["$totalCashCollected", "$totalSubmitAmount"]
        }
      }
    },

    // ❌ Filter serviceman holding more than ₹1000
    {
      $match: {
        cashInHand: { $lte: 1000 }
      }
    },

    // 9️⃣ Today booking count
    {
      $lookup: {
        from: "servicemanbookings",
        let: { servicemanId: "$serviceman._id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$servicemanId", "$$servicemanId"] },
                  { $gte: ["$createdAt", startOfToday] },
                  { $lte: ["$createdAt", endOfToday] },
                ],
              },
            },
          },
          {
            $group: {
              _id: "$servicemanId",
              count: { $sum: 1 },
            },
          },
        ],
        as: "todayBookings",
      },
    },

    // 🔟 Normalize count
    {
      $addFields: {
        todayBookingCount: {
          $ifNull: [{ $arrayElemAt: ["$todayBookings.count", 0] }, 0],
        },
      },
    },

    // 1️⃣1️⃣ Least bookings first
    { $sort: { todayBookingCount: 1 } },

    // 1️⃣2️⃣ Pick ONE
    { $limit: 1 },

    {
      $project: {
        _id: "$serviceman._id",
        userId: "$serviceman.userId",
        todayBookingCount: 1,
        currentCreditPoints: "$latestWallet.currentCreditPoints",
      },
    },
  ]);

  return servicemen[0] || null;
};


export const autoAssignMultipleServicemen = async (
  subCategoryId,
  bookingDate,
  scheduleTime,
  acceptCreditPoints
) => {
  const bookingTime24 = convert12To24(scheduleTime);

  const servicemen = await Wallet.aggregate([
    { $match: { status: true } },

    { $sort: { createdAt: -1 } },

    {
      $group: {
        _id: "$providerId",
        latestWallet: { $first: "$$ROOT" },
      },
    },

    {
      $match: {
        "latestWallet.currentCreditPoints": { $gt: acceptCreditPoints },
      },
    },

    {
      $lookup: {
        from: "servicemanprofiles",
        localField: "_id",
        foreignField: "userId",
        as: "serviceman",
      },
    },
    { $unwind: "$serviceman" },

    {
      $match: {
        "serviceman.subCategoryIds": subCategoryId,
      },
    },

    {
      $lookup: {
        from: "kycs",
        localField: "_id",
        foreignField: "userId",
        as: "kyc",
      },
    },
    { $unwind: "$kyc" },
    { $match: { "kyc.status": "approved" } },

    {
      $lookup: {
        from: "trainingschedulesubmits",
        let: { providerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$providerId", "$$providerId"] },
                  { $eq: ["$type", 1] },
                  { $eq: ["$attendanceStatus", "Present"] },
                  { $eq: ["$status", true] },
                ],
              },
            },
          },
          { $limit: 1 },
        ],
        as: "trainingAttendance",
      },
    },
    { $match: { trainingAttendance: { $ne: [] } } },

    {
      $lookup: {
        from: "servicemantimeslots",
        let: {
          providerId: "$_id",
          bookingDate: new Date(bookingDate),
          bookingTime: bookingTime24,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$servicemanId", "$$providerId"] },
                  { $eq: ["$status", true] },
                  {
                    $eq: [
                      { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                      {
                        $dateToString: {
                          format: "%Y-%m-%d",
                          date: "$$bookingDate",
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
          { $unwind: "$times" },
          {
            $match: {
              $expr: {
                $and: [
                  { $lte: ["$times.from", "$$bookingTime"] },
                  { $gte: ["$times.to", "$$bookingTime"] },
                ],
              },
            },
          },
        ],
        as: "availableSlot",
      },
    },

    { $match: { availableSlot: { $ne: [] } } },

    // CASH COLLECTION CHECK
    {
      $lookup: {
        from: "cashcollectedloggers",
        let: { providerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$providerId", "$$providerId"] },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: "cashCollected",
      },
    },

    {
      $lookup: {
        from: "cashcollectedsubmits",
        let: { providerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$providerId", "$$providerId"] },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: "cashSubmitted",
      },
    },

    {
      $addFields: {
        totalCashCollected: {
          $ifNull: [
            { $arrayElemAt: ["$cashCollected.totalCashCollected", 0] },
            0,
          ],
        },
        totalSubmitAmount: {
          $ifNull: [
            { $arrayElemAt: ["$cashSubmitted.totalSubmitAmount", 0] },
            0,
          ],
        },
      },
    },

    {
      $addFields: {
        cashInHand: {
          $subtract: ["$totalCashCollected", "$totalSubmitAmount"],
        },
      },
    },

    {
      $match: {
        cashInHand: { $lte: 1000 },
      },
    },

    {
      $project: {
        _id: "$serviceman._id",
        userId: "$serviceman.userId",
        currentCreditPoints: "$latestWallet.currentCreditPoints",
      },
    },

  ]);

  return servicemen;
};

