import ServicemanTimeSlotModel from "../../models/servicemanTimeSlot.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// export const createServicemanTimeSlot = asyncHandler(async (req, res) => {
//   const servicemanId = req.user?._id;
//   const selectedTimeSlot = req.body.selectedSlots;

//   let slots = selectedTimeSlot;

//   if (!servicemanId) {
//     throw new ApiError(401, "Unauthorized");
//   }

//   if (!Array.isArray(slots) || slots.length === 0) {
//     throw new ApiError(400, "Time slot data must be a non-empty array");
//   }

//   const dates = slots.map((item) => item.date);

//   const existingSlots = await ServicemanTimeSlotModel.find({
//     servicemanId,
//     date: { $in: dates },
//   }).select("date");

//   const existingDates = new Set(
//     existingSlots.map((s) => s.date.toISOString().split("T")[0])
//   );

//   const payload = slots.filter(({ date, times }) => {
//     if (!date) return false;
//     if (!Array.isArray(times) || times.length === 0) return false;

//     const normalizedDate = new Date(date).toISOString().split("T")[0];
//     return !existingDates.has(normalizedDate);
//   }).map(({ date, times }) => ({
//     servicemanId,
//     date,
//     times,
//     createdBy: servicemanId,
//   }));

//   if (payload.length === 0) {
//     throw new ApiError(409, "Time slots already exist for all provided dates");
//   };

//   const createdSlots = await ServicemanTimeSlotModel.insertMany(payload);

//   return res.status(201).json({
//     success: true,
//     message: "Time slots created successfully",
//     data: createdSlots,
//     skipped: slots.length - payload.length,
//   });
// });

export const createServicemanTimeSlot = asyncHandler(async (req, res) => {
  const servicemanId = req.user?._id;
  const slots = req.body.selectedSlots;

  if (!servicemanId) {
    throw new ApiError(401, "Unauthorized");
  };

  if (!Array.isArray(slots) || slots.length === 0) {
    throw new ApiError(400, "Time slot data must be a non-empty array");
  };

  const operations = [];

  for (const slot of slots) {
    if (!slot.date || !Array.isArray(slot.times) || slot.times.length === 0) {
      continue;
    };

    operations.push({
      updateOne: {
        filter: {
          servicemanId,
          date: new Date(slot.date),
        },
        update: {
          $set: {
            times: slot.times,
            updatedBy: servicemanId,
            status: true,
          },
          $setOnInsert: {
            servicemanId,
            date: new Date(slot.date),
            createdBy: servicemanId,
          },
        },
        upsert: true,
      },
    });
  };

  if (!operations.length) {
    throw new ApiError(400, "No valid slots provided");
  };

  const result = await ServicemanTimeSlotModel.bulkWrite(operations);

  return res.status(200).json({
    success: true,
    message: "Time slots saved successfully",
    inserted: result.upsertedCount,
    updated: result.modifiedCount,
  });
});

export const getServicemanTimeSlots = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, sort = "asc" } = req.query;
  const servicemanId = req.user?._id;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const sortOption = sort === "desc" ? { date: -1 } : { date: 1 };

  const filters = { servicemanId };

  const slots = await ServicemanTimeSlotModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();


  const total = await ServicemanTimeSlotModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Time slots fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: slots,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getServicemanTimeSlotById = asyncHandler(async (req, res) => {
  const servicemanId = req.user?._id;

  const slot = await ServicemanTimeSlotModel.findOne({
    _id: req.params.id,
    servicemanId,
  });

  if (!slot) {
    throw new ApiError(404, "Time slot not found");
  }

  return res.status(200).json({
    success: true,
    message: "Time slots fetched successfully",
    data: slot,
  });
});

export const updateServicemanTimeSlot = asyncHandler(async (req, res) => {
  const servicemanId = req.user?._id;
  const selectedTimeSlot = req.body.selectedSlots;
  const times = selectedTimeSlot?.times;

  if (!servicemanId) {
    throw new ApiError(401, "Unauthorized");
  }

  const s = await ServicemanTimeSlotModel.findById(req.params.id);

  if (!s) {
    throw new ApiError(404, "Slot not found");
  }

  s.times = times;
  s.save();

  return res.status(200).json({
    success: true,
    message: "Time slots updated successfully",
  });
});

export const deleteServicemanTimeSlot = asyncHandler(async (req, res) => {
  const servicemanId = req.user?._id;

  const slot = await ServicemanTimeSlotModel.findOne({
    _id: req.params.id,
    servicemanId,
  });

  if (!slot) {
    throw new ApiError(404, "Time slot not found");
  };

  await slot.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Time slot deleted successfully",
  });
});
