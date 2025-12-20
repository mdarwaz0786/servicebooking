import TrainingScheduleModel from "../../models/trainingSchedule.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import UserModel from "../../models/user.model.js";
import Training from "../../models/training.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

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

  const submit = await TrainingScheduleModel.create({
    providerId: provider?._id,
    trainingId,
    scheduleDate,
    scheduleTime,
    createdBy: userId,
  });

  return res.status(201).json({
    success: true,
    message: "Training schedule submitted successfully",
    data: submit,
  });
});

/* --------------------- GET BY ID --------------------- */
export const getTrainingScheduleSubmitById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const existingUser = await UserModel.findById(userId);
  if (!existingUser) throw new ApiError(404, "User not found");

  const provider = await ServiceManProfileModel.findOne({ userId: existingUser?._id });
  if (!provider) throw new ApiError(404, "Provider not found");

  const submit = await TrainingScheduleModel
    .findOne({ providerId: provider?._id })
    .populate({
      path: "trainingId",
      select: ""
    })
    .populate({
      path: "providerId",
      select: "",
      populate: [
        {
          path: "categoryIds",
          select: "name icon image"
        },
        {
          path: "userId",
          select: "-password -role"
        }
      ]
    })
    .lean();

  if (!submit) {
    throw new ApiError(404, "Training schedule submit not found");
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: submit
  });
});


