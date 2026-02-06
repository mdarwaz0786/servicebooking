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
  const oldAdditionalPartAmount = Number(oldUnitPrice * quantity);

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

  const newAditionalPartAmount = Number(quantity * unitPrice);

  const booking = await BookingModel.findById(bookingId);
  const bookingAdditionalPartAmount = Number(booking?.additionalPartAmount);
  const bookingAmount = Number(booking?.amount);
  const bookingPayableAmount = Number(booking?.payableAmount);

  const additionalPartAmountDifference = Number(oldAdditionalPartAmount) - Number(newAditionalPartAmount);

  const finalAdditionalPartAmount = Number(bookingAdditionalPartAmount) - Number(additionalPartAmountDifference);
  const newAmount = Number(bookingAmount) - Number(additionalPartAmountDifference);
  const newPayableAmout = Number(bookingPayableAmount) - Number(additionalPartAmountDifference);

  await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      additionalPartAmount: finalAdditionalPartAmount,
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
