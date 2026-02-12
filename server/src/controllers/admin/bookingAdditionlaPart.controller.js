import BookingAdditionalPartModel from "../../models/BookingAdditionalPart.model.js"
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import BookingModel from "../../models/booking.model.js";

export const updateUnitPrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { unitPrice, bookingId } = req.body;

  if (!unitPrice) {
    throw new ApiError(400, "unitPrice is required");
  };

  const part = await BookingAdditionalPartModel.findById(id);
  const oldUnitPrice = Number(part?.unitPrice);
  const quantity = Number(part?.quantity);

  const unitPriceDifference = oldUnitPrice - Number(unitPrice);
  const totalUnitPriceDifference = unitPriceDifference * quantity;

  const updatedPart = await BookingAdditionalPartModel.findByIdAndUpdate(
    id,
    {
      $set: {
        unitPrice,
        updatedBy: req.user?._id || null
      }
    },
    { new: true }
  );

  if (!updatedPart) {
    throw new ApiError(404, "Additional part not found");
  };

  const booking = await BookingModel.findById(bookingId);
  const bookingAdditionalPartAmount = Number(booking?.additionalPartAmount);
  const bookingAmount = Number(booking?.amount);
  const bookingPayableAmount = Number(booking?.payableAmount);

  const newAdditionalPartAmount = Number(bookingAdditionalPartAmount) - Number(totalUnitPriceDifference);
  const newAmount = Number(bookingAmount) - Number(totalUnitPriceDifference);
  const newPayableAmout = Number(bookingPayableAmount) - Number(totalUnitPriceDifference);

  await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      additionalPartAmount: newAdditionalPartAmount,
      amount: newAmount,
      payableAmount: newPayableAmout,
      updatedBy: req.user?._id,
      updatedAt: new Date(),
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Unit price updated successfully",
    data: updatedPart
  });
});
