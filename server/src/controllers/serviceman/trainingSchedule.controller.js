import TrainingModel from "../../models/training.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Get Next Upcoming Training Schedule
export const getNextTrainingSchedule = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const nextSchedule = await TrainingModel
    .findOne({
      status: true,
      startDate: { $gte: new Date() },
    })
    .populate("category","name")
    .populate({
      path: "trainigSubmit",
      match: { providerId: userId },   // 👈 USER ID MATCH
    })
    .sort({ startDate: 1 }).lean();

    let trainer = {
      subject:nextSchedule.subject,
      fullName:nextSchedule.fullName,
      startDate:nextSchedule.startDate,
      startTime:nextSchedule.startTime,
      endTime:nextSchedule.endTime,
      location:nextSchedule.location,
      maxParticipant:nextSchedule.maxParticipant,
      description:nextSchedule.description,
    }
    let trainigSubmit = nextSchedule.trainigSubmit;

  if (!nextSchedule) {
    throw new ApiError(404, "No upcoming training schedule found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: {_id:nextSchedule._id,trainer:trainer,trainigSubmit:trainigSubmit} });
});
