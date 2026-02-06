import BookingAdditionalPartModel from "../models/BookingAdditionalPart.model.js";
import ServiceManBookingModel from "../models/servicemanBooking.model.js";
import BookingModel from "../models/blog.model.js";

const rejectAdditionalParts = async (bookingId) => {
  if (!bookingId) {
    throw new Error("bookingId is required");
  };

  const additionalParts = await BookingAdditionalPartModel
    .find({ bookingId })
    .lean();

  const totalAdditionalPartAmount = additionalParts?.reduce((sum, item) => {
    const unitPrice = Number(item?.unitPrice) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + (unitPrice * quantity);
  }, 0);

  const booking = await BookingModel.findById(bookingId);
  const additionalPartAmount = Number(booking?.additionalPartAmount);
  const amount = Number(booking?.amount);
  const payableAmount = Number(booking?.payableAmount);

  await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      additionalPartAmount: 0,
      amount: Number(amount) - Number(totalAdditionalPartAmount),
      payableAmount: Number(payableAmount) - Number(totalAdditionalPartAmount),
      updatedAt: new Date(),
    },
    { new: true }
  );

  await ServiceManBookingModel.findOneAndUpdate(
    { bookingId },
    {
      $set: {
        oldAdditionalParts: additionalParts
      },
    },
    { new: true },
  );

  await BookingAdditionalPartModel.deleteMany({ bookingId });

  return true;
};

export default rejectAdditionalParts;
