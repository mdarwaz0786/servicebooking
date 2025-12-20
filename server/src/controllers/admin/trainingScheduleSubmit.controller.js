import { buildPagination } from "../../utils/pagination.js";
import TrainingScheduleSubmitModel from "../../models/trainingScheduleSubmit.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import Training from "../../models/training.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

/* --------------------- GET ALL --------------------- */
export const getTrainingScheduleSubmits = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const sortOption =
    sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const data = await TrainingScheduleSubmitModel
    .find()
    .populate("user")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await TrainingScheduleSubmitModel.countDocuments();
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

/* --------------------- GET BY ID --------------------- */
export const getTrainingScheduleSubmitById = asyncHandler(async (req, res) => {
  const submit = await TrainingScheduleSubmitModel.findById(req.params.id).populate("user");

  if (!submit) {
    throw new ApiError(404, "Training schedule submit not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: submit
  });
});

/* --------------------- UPDATE --------------------- */
export const updateTrainingScheduleSubmit = asyncHandler(async (req, res) => {
  const submit = await TrainingScheduleSubmitModel.findById(req.params.id);

  if (!submit) {
    throw new ApiError(404, "Training schedule submit not found");
  }

  const {
    scheduleDate,
    scheduleTime,
    providerId,
    trainingId,
    status,
    trainingScheduleStatus,
    remarks,
  } = req.body;

  if (providerId && providerId.toString() !== submit.providerId?.toString()) {
    const provider = await ServiceManProfileModel.findById(providerId);
    if (!provider) throw new ApiError(404, "Provider not found");

    submit.providerId = providerId;
    submit.provider = {
      providerId: provider?._id,
      userId: provider?.userId,
      categoryIds: provider?.categoryIds,
      name: provider?.name,
      email: provider?.email,
      mobile: provider?.mobile,
      dob: provider?.dob,
      profileImage: provider?.profileImage,
      experienceLevel: provider?.experienceLevel,
      companyName: provider?.companyName,
      permanentAddress: provider?.permanentAddress,
      currentAddress: provider?.currentAddress,
      referenceName1: provider?.referenceName1,
      referenceMobile1: provider?.referenceMobile1,
      referenceName2: provider?.referenceName2,
      referenceMobile2: provider?.referenceMobile2,
    };
  }

  if (trainingId && trainingId.toString() !== submit.trainingId?.toString()) {
    const training = await Training.findById(trainingId);
    if (!training) throw new ApiError(404, "Training not found");

    submit.trainingId = trainingId;
    submit.training = {
      trainingId: training?._id,
      category: training?.category,
      subject: training?.subject,
      firstName: training?.firstName,
      lastName: training?.lastName,
      fullName: training?.fullName,
      startDate: training?.startDate,
      startTime: training?.startTime,
      endTime: training?.endTime,
      location: training?.location,
      maxParticipant: training?.maxParticipant,
      description: training?.description,
    };
  }

  submit.remarks =
    remarks !== undefined ? remarks : submit.remarks;

  submit.scheduleDate =
    scheduleDate !== undefined ? scheduleDate : submit.scheduleDate;

  submit.scheduleTime =
    scheduleTime !== undefined ? scheduleTime : submit.scheduleTime;

  submit.status =
    typeof status === "boolean" ? status : submit.status;

  submit.trainingScheduleStatus =
    trainingScheduleStatus !== undefined
      ? trainingScheduleStatus
      : submit.trainingScheduleStatus;

  submit.updatedBy = req.user?._id;
  submit.updatedAt = new Date();

  await submit.save();

  return res.status(200).json({
    success: true,
    message: "Updated Successfully",
    data: submit,
  });
});

/* --------------------- DELETE (HARD) --------------------- */
export const deleteTrainingScheduleSubmit = asyncHandler(async (req, res) => {
  const submit = await TrainingScheduleSubmitModel.findByIdAndDelete(req.params.id);

  if (!submit) {
    throw new ApiError(404, "Training schedule submit not found");
  }

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
