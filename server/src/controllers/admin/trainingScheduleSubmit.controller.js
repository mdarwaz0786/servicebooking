import { buildPagination } from "../../utils/pagination.js";
import TrainingScheduleSubmitModel from "../../models/trainingScheduleSubmit.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

/* --------------------- GET ALL --------------------- */
export const getTrainingScheduleSubmits = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, sort = "desc", status, serviceman, trainer } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (status) {
    filters.trainingScheduleStatus = status;
  };

  if (serviceman) {
    filters.providerId = serviceman;
  };

  if (trainer) {
    filters.trainingId = trainer;
  };

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const data = await TrainingScheduleSubmitModel
    .find(filters)
    .populate("provider")
    .populate("training")
    .populate("profile")
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
  const submit = await TrainingScheduleSubmitModel
    .findById(req.params.id)
    .populate("provider")
    .populate("training")
    .populate("profile")

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
    status,
    trainingScheduleStatus,
    remarks,
  } = req.body;

  submit.remarks = remarks !== undefined ? remarks : submit.remarks;
  submit.status = typeof status === "boolean" ? status : submit.status;
  submit.trainingScheduleStatus = trainingScheduleStatus !== undefined ? trainingScheduleStatus : submit.trainingScheduleStatus;

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
