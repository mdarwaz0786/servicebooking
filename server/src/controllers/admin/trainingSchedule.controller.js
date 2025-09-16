import TrainingScheduleModel from "../models/TrainingSchedule.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Create Training Schedule
export const createTrainingSchedule = asyncHandler(async (req, res) => {
  const { scheduledDate, scheduleTime } = req.body;

  if (!scheduledDate || !scheduleTime) {
    throw new ApiError(400, "Scheduled date and time are required");
  };

  const trainingSchedule = await TrainingScheduleModel.create({
    scheduledDate,
    scheduleTime,
    createdBy: req.user._id,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: trainingSchedule });
});

// ✅ Get All Training Schedules
export const getAllTrainingSchedules = asyncHandler(async (req, res) => {
  const schedules = await TrainingScheduleModel.find()
    .sort({ scheduledDate: 1 });

  res
    .status(200)
    .json(new ApiResponse(200, schedules, "All training schedules fetched"));
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
  const { scheduledDate, scheduleTime, status } = req.body;

  const schedule = await TrainingScheduleModel.findById(id);
  if (!schedule) {
    throw new ApiError(404, "Training schedule not found");
  };

  schedule.scheduledDate = scheduledDate || schedule.scheduledDate;
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
  const nextSchedule = await TrainingScheduleModel.findOne({
    status: true,
    scheduledDate: { $gte: new Date() },
  }).sort({ scheduledDate: 1 });

  if (!nextSchedule) {
    throw new ApiError(404, "No upcoming training schedule found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: nextSchedule });
});
