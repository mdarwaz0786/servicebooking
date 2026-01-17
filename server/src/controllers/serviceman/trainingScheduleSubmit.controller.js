import TrainingScheduleSubmitModel from "../../models/trainingScheduleSubmit.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import UserModel from "../../models/user.model.js";
import Training from "../../models/training.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// submit training schedule
export const createTrainingScheduleSubmit = asyncHandler(async (req, res) => {
  const { trainingId, scheduleDate, scheduleTime } = req.body;
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "UserId is required");
  if (!trainingId) throw new ApiError(400, "TrainingId is required");
  if (!scheduleDate) throw new ApiError(400, "ScheduleDate is required");
  if (!scheduleTime) throw new ApiError(400, "ScheduleTime is required");

  const existingTraining = await Training.findById(trainingId);
  if (!existingTraining) throw new ApiError(400, "Training not found ");

  const existingUser = await UserModel.findById(userId);
  if (!existingUser) throw new ApiError(404, "User not found");

  const provider = await ServiceManProfileModel.findOne({ userId: existingUser?._id });
  if (!provider) throw new ApiError(404, "Provider not found");

  const training = await Training.findById(trainingId);
  if (!training) throw new ApiError(404, "Training not found");

  const submit = await TrainingScheduleSubmitModel.create({
    providerId: userId,
    trainingId,
    scheduleDate,
    scheduleTime,
    createdBy: userId,
    user: userId,
  });

  await TrainingScheduleSubmitModel.findOneAndUpdate(
    {
      providerId: userId,
      _id: { $ne: submit?._id },
    },
    {
      trainingScheduleStatus: "Reschedule",
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res.status(201).json({
    success: true,
    message: "Training schedule submitted successfully",
    data: submit,
  });
});

/* --------------------- GET BY ID --------------------- */
export const getTrainingScheduleSubmitById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const id = req.params.id;

  const existingUser = await UserModel.findById(userId);
  if (!existingUser) throw new ApiError(404, "User not found");

  let submit;

  if (id) {
    submit = await TrainingScheduleSubmitModel
      .findById(id)
      .populate("training").sort({ createdAt: -1 })
      .lean();
  } else {
    submit = await TrainingScheduleSubmitModel
      .findOne({ providerId: userId })
      .populate("training").sort({ createdAt: -1 })
      .lean();
  };

  if (!submit) {
    throw new ApiError(404, "Training schedule submit not found");
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: submit
  });
});

export const getTrainingScheduleSubmits = asyncHandler(async (req, res) => {
  let { sort = "desc", page, limit, attendanceStatus, trainingScheduleStatus } = req.query;
  const userId = req.user?._id;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  filters.providerId = userId;
  filters.status = true;

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else sortOption = { createdAt: -1 };

  if (trainingScheduleStatus) {
    filters.trainingScheduleStatus = trainingScheduleStatus
  };

  if (attendanceStatus) {
    filters.attendanceStatus = attendanceStatus;
  };

  const submits = await TrainingScheduleSubmitModel
    .find(filters)
    .populate("training")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await TrainingScheduleSubmitModel.countDocuments(filters);
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
    data: submits,
    pagination: buildPagination({ page, limit, total }),
  });
});



