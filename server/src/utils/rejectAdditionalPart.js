import BookingAdditionalPartModel from "../models/BookingAdditionalPart.model.js";
import ServiceManBookingModel from "../models/servicemanBooking.model.js";
import BookingModel from "../models/booking.model.js";

const rejectAdditionalParts = async (bookingId) => {
  if (!bookingId) {
    throw new Error("bookingId is required");
  };

  const additionalParts = await BookingAdditionalPartModel
    .find({ bookingId })
    .lean();

  if (!additionalParts.length) {
    return true;
  };

  const totalAdditionalPartAmount = additionalParts?.reduce((sum, item) => {
    const unitPrice = Number(item?.unitPrice) || 0;
    const quantity = Number(item?.quantity) || 1;
    return sum + (unitPrice * quantity);
  }, 0);

  const booking = await BookingModel.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found while rejecting additional parts");
  };

  const currentAmount = Number(booking?.amount) || 0;
  const currentPayable = Number(booking?.payableAmount) || 0;

  const newAmount = Math.max(0, currentAmount - totalAdditionalPartAmount);
  const newPayable = Math.max(0, currentPayable - totalAdditionalPartAmount);

  await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      additionalPartAmount: 0,
      amount: newAmount,
      payableAmount: newPayable,
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
