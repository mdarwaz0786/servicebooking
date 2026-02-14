import BookingModel from "../models/booking.model.js";
import ServiceManBookingModel from "../models/servicemanBooking.model.js";

export const createBookingReclaim = async (
  bookingId,
) => {
  const booking = await BookingModel.findbyId(bookingId);
  const latestServiceman = await ServiceManBookingModel.findOne({ bookingId: bookingId, status: "complete" });



};
