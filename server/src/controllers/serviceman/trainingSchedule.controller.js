import TrainingModel from "../../models/training.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Get Next Upcoming Training Schedule
// export const getNextTrainingSchedule = asyncHandler(async (req, res) => {
//   const userId = req.user?._id;
//   let date = req.query.date;

//   let startDate;
//   if (date) {
//     startDate = new Date(date);
//     startDate.setHours(0, 0, 0, 0);
//   } else {
//     startDate = new Date();
//     startDate.setHours(0, 0, 0, 0);
//   }

//   const serviceman = await ServiceManProfileModel
//     .findOne({ userId: userId })
//     .lean();

//   if (!serviceman) {
//     throw new ApiError(404, "Serviceman profile not found");
//   };

//   const nextSchedule = await TrainingModel
//     .findOne({
//       status: true,
//       category: { $in: serviceman.categoryIds },
//       startDate: { $gte: startDate },
//     })
//     .populate("category", "name")
//     .populate({
//       path: "trainigSubmit",
//       match: { providerId: userId },
//     })
//     .sort({ startDate: 1 }).lean();

//   const allDates = await TrainingModel
//     .find({
//       status: true,
//       category: { $in: serviceman.categoryIds },
//       startDate: { $gt: new Date() },
//     }).select("startDate");

//   const dateList = [];

//   for (let i = 0; i < allDates.length; i++) {
//     dateList.push(allDates[i].startDate);
//   };

//   if (!nextSchedule) {
//     throw new ApiError(404, "No upcoming training schedule found");
//   };

//   let trainer = {
//     subject: nextSchedule?.subject,
//     fullName: nextSchedule?.fullName,
//     startDate: nextSchedule?.startDate,
//     startTime: nextSchedule?.startTime,
//     endTime: nextSchedule?.endTime,
//     location: nextSchedule?.location,
//     maxParticipant: nextSchedule?.maxParticipant,
//     description: nextSchedule?.description,
//   }

//   let trainigSubmit = nextSchedule?.trainigSubmit;

//   return res.status(200).json({ success: true, message: "Data fetched successfully", data: { _id: nextSchedule._id, dates: dateList, trainer: trainer, trainigSubmit: trainigSubmit } });
// });

// Get Next Upcoming Training Schedule
export const getNextTrainingSchedule = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const date = req.query.date;

  /* ------------------ Date Filter ------------------ */
  let dateFilter = {};

  if (date) {
    // Exact date match (same calendar day)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    dateFilter.startDate = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  } else {
    // NEXT upcoming training (after current time)
    dateFilter.startDate = { $gt: new Date() };
  }

  /* ------------------ Serviceman ------------------ */
  const serviceman = await ServiceManProfileModel
    .findOne({ userId })
    .lean();

  if (!serviceman) {
    throw new ApiError(404, "Serviceman profile not found");
  }

  /* ------------------ Next Schedule ------------------ */
  const nextSchedule = await TrainingModel
    .findOne({
      status: true,
      category: { $in: serviceman.categoryIds },
      ...dateFilter,
    })
    .populate("category", "name")
    // .populate({
    //   path: "trainigSubmit",
    //   match: { providerId: userId },
    // })
    .sort({ startDate: 1 }) // 👈 ensures NEXT date
    .lean();

  if (!nextSchedule) {
    throw new ApiError(404, "No upcoming training schedule found");
  }

  /* ------------------ All Upcoming Dates ------------------ */
  const allDates = await TrainingModel
    .find({
      status: true,
      category: { $in: serviceman.categoryIds },
      startDate: { $gt: new Date() },
    })
    .select("startDate")
    .sort({ startDate: 1 })
    .lean();

  const dateList = allDates.map(d => d.startDate);

  /* ------------------ Response Mapping ------------------ */
  const trainer = {
    subject: nextSchedule.subject,
    fullName: nextSchedule.fullName,
    startDate: nextSchedule.startDate,
    startTime: nextSchedule.startTime,
    endTime: nextSchedule.endTime,
    location: nextSchedule.location,
    maxParticipant: nextSchedule.maxParticipant,
    description: nextSchedule.description,
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: {
      _id: nextSchedule._id,
      dates: dateList,
      trainer,
      // trainigSubmit: nextSchedule.trainigSubmit,
    },
  });
});


