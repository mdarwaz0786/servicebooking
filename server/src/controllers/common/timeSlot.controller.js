import TimeSlotModel from "../../models/timeSlot.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import moment from "moment-timezone";

// Get time slots by date (IST, 12-hour AM/PM)
export const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date) throw new ApiError(400, "Date is required");

  const allSlots = await TimeSlotModel.find({ status: true }).sort({ time: 1 });

  const currentIST = moment().tz("Asia/Kolkata"); // current IST datetime
  const selectedDate = moment.tz(date, "YYYY-MM-DD", "Asia/Kolkata"); // selected date in IST

  let availableSlots;

  if (selectedDate.isSame(currentIST, "day")) {
    // Today → filter only slots after current time
    availableSlots = allSlots.filter(slot => {
      const slotDateTime = moment.tz(
        `${date} ${slot.time}`,
        "YYYY-MM-DD hh:mm A",
        "Asia/Kolkata"
      );
      return slotDateTime.isAfter(currentIST);
    });
  } else {
    // Future date → all slots are available
    availableSlots = allSlots;
  };

  // Format time in 12-hour AM/PM
  const slotsWithFormattedTime = availableSlots.map(slot => ({
    ...slot.toObject(),
    time: moment.tz(slot.time, "hh:mm A", "Asia/Kolkata").format("hh:mm A")
  }));

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    timezone: "Asia/Kolkata",
    date,
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