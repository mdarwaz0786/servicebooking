import TrainingScheduleModel from "../../models/trainingSchedule.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Get Next Upcoming Training Schedule
export const getNextTrainingSchedule = asyncHandler(async (req, res) => {
  const nextSchedule = await TrainingScheduleModel
    .findOne({
      status: true,
      scheduleDate: { $gte: new Date() },
    })
    .sort({ scheduleDate: 1 });

  if (!nextSchedule) {
    throw new ApiError(404, "No upcoming training schedule found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: nextSchedule });
});
