import TimeSlotModel from "../../models/timeSlot.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import moment from "moment-timezone";
import { buildPagination } from "../../utils/pagination.js";

// Create time slot
export const createTimeSlot = asyncHandler(async (req, res) => {
  let { time } = req.body;

  if (!time) {
    throw new ApiError(400, "Time is required");
  };

  // Normalize to 12-hour AM/PM format in IST
  const formattedTime = moment.tz(time, "hh:mm A", "Asia/Kolkata").format("hh:mm A");

  const exists = await TimeSlotModel.findOne({ time: formattedTime });
  if (exists) {
    throw new ApiError(400, "Time slot already exists");
  };

  const newSlot = await TimeSlotModel.create({ time: formattedTime });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: newSlot,
  });
});

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
    message: "Data fetch successfully",
    timezone: "Asia/Kolkata",
    date,
    count: slotsWithFormattedTime.length,
    data: slotsWithFormattedTime,
  });
});

// Get all time slots
export const getAllTimeSlots = asyncHandler(async (req, res) => {
  let { page, limit, search, sort = "desc", status } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (search) {
    filter.time = { $regex: search, $options: "i" };
  };

  if (status !== undefined) filter.status = status === "true";

  const total = await TimeSlotModel.countDocuments(filter);
  let slots = await TimeSlotModel.find(filter);

  slots.sort((a, b) => {
    const timeA = moment(a.time, "hh:mm A").hours() * 60 + moment(a.time, "hh:mm A").minutes();
    const timeB = moment(b.time, "hh:mm A").hours() * 60 + moment(b.time, "hh:mm A").minutes();
    return sort === "asc" ? timeA - timeB : timeB - timeA;
  });

  slots = slots.slice(skip, skip + limit);

  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetch successfully",
    page,
    limit,
    total,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: slots,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Single time slot
export const getSingleTimeSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const slot = await TimeSlotModel.findById(id);
  if (!slot) throw new ApiError(404, "Time slot not found");

  return res.status(200).json({
    success: true,
    message: "Data fetch successfully",
    data: slot,
  });
});

// Update time slot
export const updateTimeSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { time, status } = req.body;

  const updateData = {};

  if (time) {
    const formattedTime = moment
      .tz(time, "hh:mm A", "Asia/Kolkata")
      .format("hh:mm A");

    const exists = await TimeSlotModel.findOne({
      time: formattedTime,
      _id: { $ne: id },
    });

    if (exists) throw new ApiError(400, "Time already exists");

    updateData.time = formattedTime;
  };

  if (typeof status !== "undefined") {
    updateData.status = status;
  };

  const updatedSlot = await TimeSlotModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedSlot) throw new ApiError(404, "Time slot not found");

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: updatedSlot,
  });
});

// Delete time slot
export const deleteTimeSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedSlot = await TimeSlotModel.findByIdAndDelete(id);
  if (!deletedSlot) throw new ApiError(404, "Time slot not found");

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});


