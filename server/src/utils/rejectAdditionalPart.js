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

  await ServiceManBookingModel.findOneAndUpdate(
    { bookingId },
    {
      $set: {
        oldAdditionalParts: additionalParts
      }
    },
    { new: true }
  );

  await BookingAdditionalPartModel.deleteMany({ bookingId });

  return true;
};

export default rejectAdditionalParts;
