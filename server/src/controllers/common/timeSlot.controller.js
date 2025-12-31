import TimeSlotModel from "../../models/timeSlot.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import moment from "moment-timezone";

// Get time slots by date (IST, 12-hour AM/PM)
export const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date) throw new ApiError(400, "Date is required");

  const allSlots = await TimeSlotModel.find({ status: true }).sort({ time: 1 });

  const currentIST = moment().tz("Asia/Kolkata");
  const selectedDate = moment.tz(date, "YYYY-MM-DD", "Asia/Kolkata");

  // 🔥 add 2 hours buffer
  const minAllowedTime = currentIST.clone().add(2, "hours");

  let availableSlots;

  if (selectedDate.isSame(currentIST, "day")) {
    // Today → allow slots only after current time + 2 hours
    availableSlots = allSlots.filter((slot) => {
      const slotDateTime = moment.tz(
        `${date} ${slot.time}`,
        "YYYY-MM-DD hh:mm A",
        "Asia/Kolkata"
      );

      return slotDateTime.isAfter(minAllowedTime);
    });
  } else {
    // Future date → all slots available
    availableSlots = allSlots;
  }

  // Ensure proper ordering (AM → PM)
  availableSlots.sort((a, b) => {
    const timeA = moment(a.time, "hh:mm A");
    const timeB = moment(b.time, "hh:mm A");
    return timeA - timeB;
  });

  const slotsWithFormattedTime = availableSlots.map((slot) => ({
    ...slot.toObject(),
    time: moment(slot.time, "hh:mm A").format("hh:mm A"),
  }));

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    timezone: "Asia/Kolkata",
    date,
    minTimeAllowed: minAllowedTime.format("hh:mm A"),
    total: slotsWithFormattedTime.length,
    data: slotsWithFormattedTime,
  });
});

// Single time slot
export const getSingleTimeSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const slot = await TimeSlotModel.findById(id);
  if (!slot) throw new ApiError(404, "Time slot not found");

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: slot,
  });
});