import TrainingModel from "../../models/training.model.js";
import TrainingScheduleSubmitModel from "../../models/trainingScheduleSubmit.model.js";
import TrainingScheduleSubmitLoggerModel from "../../models/trainingScheduleSubmitLogger.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import { buildPagination } from "../../utils/pagination.js";
import mongoose from "mongoose";

export const createTraining = asyncHandler(async (req, res) => {
  const {
    category,
    subject,
    firstName,
    lastName,
    startDate,
    startTime,
    endTime,
    location,
    maxParticipant,
    description,
    type,
    providerIds = [],
  } = req.body;

  if (!category) throw new ApiError(400, "Category is required");
  if (!subject?.trim()) throw new ApiError(400, "Training subject is required");
  if (!firstName?.trim()) throw new ApiError(400, "First name is required");
  if (!lastName?.trim()) throw new ApiError(400, "Last name is required");
  if (!startDate) throw new ApiError(400, "Start date is required");
  if (!startTime) throw new ApiError(400, "Start time is required");
  if (!endTime) throw new ApiError(400, "End time is required");
  if (!location?.trim()) throw new ApiError(400, "Location is required");
  if (!maxParticipant) throw new ApiError(400, "Maximum participants is required");

  const maxUsers = Number(maxParticipant);
  const trainingType = Number(type);

  if (!maxUsers || maxUsers <= 0) {
    throw new ApiError(400, "Maximum participants must be greater than 0");
  }

  if (trainingType === 2) {
    if (!Array.isArray(providerIds) || providerIds.length === 0) {
      throw new ApiError(400, "At least one provider is required");
    }

    if (providerIds.length > maxUsers) {
      throw new ApiError(400, "Providers exceed max participants");
    }
  }

  let training = await TrainingModel.create({
    category,
    subject,
    firstName,
    lastName,
    startDate,
    startTime,
    endTime,
    location,
    maxParticipant,
    description,
    type,
    providerIds: trainingType === 2 ? providerIds : [],
    createdBy: req.user?._id,
  });

  const slug = await generateUniqueSlug(
    subject,
    "Training",
    training._id,
    "trainings"
  );

  training.slug = slug;
  await training.save();


  if (trainingType === 2 && providerIds?.length > 0) {
    const scheduleDocs = providerIds?.map((providerId) => ({
      trainingId: training._id,
      providerId,
      type: 2,
      scheduleDate: startDate,
      scheduleTime: startTime,
      createdBy: req.user?._id,
      user: req.user?._id,
    }));

    await Promise.all([
      TrainingScheduleSubmitModel.insertMany(scheduleDocs),
      TrainingScheduleSubmitLoggerModel.insertMany(scheduleDocs),
    ]);
  };

  return res.status(201).json({ success: true, message: "Created successfully", data: training });
});

export const getTrainings = asyncHandler(async (req, res) => {
  let {
    search,
    sort = "desc",
    page,
    limit,
    category
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { subject: { $regex: search, $options: "i" } },
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } }
    ];
  }

  if (category) filters.category = category;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const trainings = await TrainingModel.find(filters)
    .populate("category", "name")
    .populate("provider", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean({ virtuals: true });

  const total = await TrainingModel.countDocuments(filters);
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
    pagination: buildPagination({ page, limit, total })
  });
});

export const getTrainingById = asyncHandler(async (req, res) => {
  const training = await TrainingModel
    .findById(req.params.id)
    .populate("category", "name")
    .populate("provider", "name")
    .lean({ virtuals: true });

  if (!training) throw new ApiError(404, "Training not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: training });
});

export const updateTraining = asyncHandler(async (req, res) => {
  const {
    category,
    subject,
    firstName,
    lastName,
    startDate,
    startTime,
    endTime,
    location,
    maxParticipant,
    description,
    status,
    type,
    providerIds = [],
  } = req.body;

  const maxUsers = Number(maxParticipant);
  const trainingType = Number(type);

  if (!maxUsers || maxUsers <= 0) {
    throw new ApiError(400, "Maximum participants must be greater than 0");
  }

  if (trainingType === 2) {
    if (!Array.isArray(providerIds) || providerIds.length === 0) {
      throw new ApiError(400, "At least one provider is required");
    }

    if (providerIds.length > maxUsers) {
      throw new ApiError(400, "Providers exceed max participants");
    }
  }

  const training = await TrainingModel.findById(req.params.id);
  if (!training) throw new ApiError(404, "Training not found");

  if (subject && subject !== training.subject) {
    await SlugModel.deleteOne({
      collectionName: "Training",
      documentId: training._id
    });

    const newSlug = await generateUniqueSlug(
      subject,
      "Training",
      training._id,
      "trainings"
    );

    training.slug = newSlug;
  };

  training.category = category !== undefined ? category : training.category;
  training.subject = subject !== undefined ? subject : training.subject;
  training.firstName = firstName !== undefined ? firstName : training.firstName;
  training.lastName = lastName !== undefined ? lastName : training.lastName;
  training.startDate = startDate !== undefined ? startDate : training.startDate;
  training.startTime = startTime !== undefined ? startTime : training.startTime;
  training.endTime = endTime !== undefined ? endTime : training.endTime;
  training.location = location !== undefined ? location : training.location;
  training.maxParticipant = maxParticipant !== undefined ? maxParticipant : training.maxParticipant;
  training.description = description !== undefined ? description : training.description;
  training.providerIds = providerIds || training.providerIds;
  training.status = typeof status === "boolean" ? status : training.status;
  training.updatedBy = req.user?._id;
  training.updatedAt = new Date();

  await training.save();


  if (trainingType === 2 && Array.isArray(providerIds)) {

    // 🔹 Normalize ObjectIds
    const newProviderIds = providerIds.map(id =>
      new mongoose.Types.ObjectId(id)
    );

    // 🔹 Get existing schedules
    const existingSchedules = await TrainingScheduleSubmitModel.find({
      trainingId: training._id,
      type: 2,
    }).lean();

    const existingProviderIds = existingSchedules.map(s =>
      s.providerId.toString()
    );

    // 🔹 Providers to ADD
    const providersToAdd = newProviderIds.filter(
      id => !existingProviderIds.includes(id.toString())
    );

    // 🔹 Providers to REMOVE
    const providersToRemove = existingProviderIds.filter(
      id => !newProviderIds.map(p => p.toString()).includes(id)
    );

    // 🔹 DELETE removed providers ONLY
    if (providersToRemove.length) {
      await TrainingScheduleSubmitModel.deleteMany({
        trainingId: training._id,
        type: 2,
        providerId: { $in: providersToRemove },
      });
    }

    // 🔹 INSERT new providers ONLY
    if (providersToAdd.length) {
      const scheduleDocs = providersToAdd.map(providerId => ({
        trainingId: training._id,
        providerId,
        type: 2,
        scheduleDate: startDate || training.startDate,
        scheduleTime: startTime || training.startTime,
        createdBy: req.user?._id,
        user: req.user?._id,
      }));

      await TrainingScheduleSubmitModel.insertMany(scheduleDocs);
      await TrainingScheduleSubmitLoggerModel.insertMany(scheduleDocs);
    }
  }

  return res.status(200).json({ success: true, message: "Updated successfully", data: training });
});

export const deleteTraining = asyncHandler(async (req, res) => {
  const training = await TrainingModel.findById(req.params.id);
  if (!training) throw new ApiError(404, "Training not found");

  await SlugModel.deleteOne({
    collectionName: "Training",
    documentId: training._id
  });

  await training.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Training deleted successfully"
  });
});
