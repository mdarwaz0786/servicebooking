import TrainingScheduleModel from "../../models/trainingSchedule.model.js";
import TrainingScheduleSubmitModel from "../../models/trainingScheduleSubmit.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Get Next Upcoming Training Schedule
export const getNextTrainingSchedule = asyncHandler(async (req, res) => {
  const nextSchedule = await TrainingScheduleModel
    .findOne({
      status: true,
      scheduleDate: { $gte: new Date() },
    }).populate("trainingId").populate("providerId")
    .sort({ scheduleDate: 1 }).lean();

  if (!nextSchedule) {
    throw new ApiError(404, "No upcoming training schedule found");
  };

  const providerUserId = nextSchedule?.providerId?.userId;

  let trainingScheduleStatus = 0;

  if (providerUserId) {
    const isSubmitted = await TrainingScheduleSubmitModel.findOne({
      user: providerUserId,
      status: true,
    });

    trainingScheduleStatus = isSubmitted ? 1 : 0;
  }

  nextSchedule.trainingScheduleStatus = trainingScheduleStatus;

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: nextSchedule });
});
