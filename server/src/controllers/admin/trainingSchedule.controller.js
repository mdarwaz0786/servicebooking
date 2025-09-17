import TrainingScheduleModel from "../../models/trainingSchedule.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Create Training Schedule
export const createTrainingSchedule = asyncHandler(async (req, res) => {
  const { scheduleDate, scheduleTime } = req.body;

  if (!scheduleDate || !scheduleTime) {
    throw new ApiError(400, "Scheduled date and time are required");
  };

  const trainingSchedule = await TrainingScheduleModel.create({
    scheduleDate,
    scheduleTime,
    createdBy: req.user._id,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: trainingSchedule });
});

// Get All Training Schedules
export const getAllTrainingSchedules = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page,
    limit,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { status: { $regex: search, $options: "i" } },
    ];
  };

  if (status !== undefined) {
    filters.status = status === "true";
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  let trainings = await TrainingScheduleModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)

  const total = await TrainingScheduleModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: trainings,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single Training Schedule
export const getTrainingScheduleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schedule = await TrainingScheduleModel.findById(id)

  if (!schedule) {
    throw new ApiError(404, "Training schedule not found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: schedule });
});

// Update Training Schedule
export const updateTrainingSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { scheduleDate, scheduleTime, status } = req.body;

  const schedule = await TrainingScheduleModel.findById(id);
  if (!schedule) {
    throw new ApiError(404, "Training schedule not found");
  };

  schedule.scheduleDate = scheduleDate || schedule.scheduleDate;
  schedule.scheduleTime = scheduleTime || schedule.scheduleTime;
  if (status !== undefined) schedule.status = status;
  schedule.updatedBy = req.user._id;

  await schedule.save();

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: schedule });
});

// Delete Training Schedule
export const deleteTrainingSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schedule = await TrainingScheduleModel.findById(id);
  if (!schedule) {
    throw new ApiError(404, "Training schedule not found");
  };

  await schedule.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});

// Get Next Upcoming Training Schedule
export const getNextTrainingSchedule = asyncHandler(async (req, res) => {
  const nextSchedule = await TrainingScheduleModel
    .findOne({
      status: true,
      scheduledDate: { $gte: new Date() },
    }).sort({ scheduledDate: 1 });

  if (!nextSchedule) {
    throw new ApiError(404, "No upcoming training schedule found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: nextSchedule });
});
