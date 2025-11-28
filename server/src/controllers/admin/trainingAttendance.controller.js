import TrainingAttendanceModel from "../../models/trainingAttendance.model.js";
import TrainingModel from "../../models/training.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createTrainingAttendance = asyncHandler(async (req, res) => {
  const { providerId, date, trainingId, location, interviewStatus, status } = req.body;

  if (!providerId) throw new ApiError(400, "Provider is required");
  if (!trainingId) throw new ApiError(400, "Training is required");
  if (!date) throw new ApiError(400, "Date is required");
  if (!location?.trim()) throw new ApiError(400, "Location is required");

  const trainingExists = await TrainingModel.findById(trainingId);
  if (!trainingExists) throw new ApiError(404, "Training not found");

  const attendance = await TrainingAttendanceModel.create({
    providerId,
    date,
    trainingId,
    location,
    interviewStatus,
    status
  });

  return res.status(201).json({ success: true, data: attendance });
});

export const getTrainingAttendance = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit, providerId, trainingId, status } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (providerId) filters.providerId = providerId;
  if (trainingId) filters.trainingId = trainingId;
  if (status) filters.status = status;

  if (search) {
    filters.location = { $regex: search, $options: "i" };
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const data = await TrainingAttendanceModel.find(filters)
    .populate("providerId")
    .populate("trainingId")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await TrainingAttendanceModel.countDocuments(filters);
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
    data,
    pagination: buildPagination({ page, limit, total })
  });
});

export const getTrainingAttendanceById = asyncHandler(async (req, res) => {
  const attendance = await TrainingAttendanceModel.findById(req.params.id)
    .populate("providerId")
    .populate("trainingId");

  if (!attendance) throw new ApiError(404, "Training attendance not found");

  return res.status(200).json({ success: true, data: attendance });
});

export const updateTrainingAttendance = asyncHandler(async (req, res) => {
  const { providerId, date, trainingId, location, interviewStatus, status } = req.body;

  const attendance = await TrainingAttendanceModel.findById(req.params.id);
  if (!attendance) throw new ApiError(404, "Training attendance not found");

  if (trainingId) {
    const trainingExists = await TrainingModel.findById(trainingId);
    if (!trainingExists) throw new ApiError(404, "Training not found");
  }

  attendance.providerId = providerId || attendance.providerId;
  attendance.date = date || attendance.date;
  attendance.trainingId = trainingId || attendance.trainingId;
  attendance.location = location || attendance.location;
  attendance.interviewStatus = interviewStatus || attendance.interviewStatus;
  attendance.status = status || attendance.status;

  await attendance.save();

  return res.status(200).json({ success: true, data: attendance });
});

export const deleteTrainingAttendance = asyncHandler(async (req, res) => {
  const attendance = await TrainingAttendanceModel.findById(req.params.id);
  if (!attendance) throw new ApiError(404, "Training attendance not found");

  await attendance.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Training attendance deleted successfully"
  });
});
