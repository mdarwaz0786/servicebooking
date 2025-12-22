import BookingAdditionalPartModel from "../../models/BookingAdditionalPart.model.js";
import BookingModel from "../../models/booking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// ================= CREATE ADDITIONAL PARTS =================
export const createBookingAdditionalParts = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const {
    bookingId,
    parts
  } = req.body;

  if (!bookingId) {
    throw new ApiError(400, "Booking ID is required");
  }

  if (!parts) {
    throw new ApiError(400, "Parts data is required");
  }

  let parsedParts;
  try {
    parsedParts = JSON.parse(parts);
  } catch (err) {
    throw new ApiError(400, "Invalid parts JSON format");
  }

  if (!Array.isArray(parsedParts) || parsedParts.length === 0) {
    throw new ApiError(400, "Parts must be a non-empty array");
  }

  const documents = parsedParts.map((item) => ({
    bookingId,
    rateId: item.rateId,
    description: item.description,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
    laborCharge: item.labourCharge || 0,
    groupTitle: item.groupTitle,
    serviceItemId: item.serviceItemId,
    createdBy: userId,
  }));

  await BookingModel.findByIdAndUpdate(
    bookingId,
    { status: "partstatusnew" },
    { new: true }
  );

  const savedParts = await BookingAdditionalPartModel.insertMany(documents);

  return res.status(201).json({
    success: true,
    message: "Additional parts added successfully",
    data: savedParts,
  });
});
