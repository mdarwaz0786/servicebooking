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

  const totalAdditionalPartAmount = additionalParts?.reduce((sum, item) => {
    const unitPrice = Number(item?.unitPrice) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + (unitPrice * quantity);
  }, 0);

  const booking = await BookingModel.findById(bookingId);

  const newAmount = Number(booking?.amount || 0) - totalAdditionalPartAmount;
  const newPayable = Number(booking?.payableAmount || 0) - totalAdditionalPartAmount;

  await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      additionalPartAmount: 0,
      amount: Math.max(newAmount, 0),
      payableAmount: Math.max(newPayable, 0),
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
