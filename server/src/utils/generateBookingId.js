import BookingModel from "../models/Booking.model.js";

const generateBookingId = async () => {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0].replace(/-/g, "");
  const count = await BookingModel.countDocuments({
    createdAt: {
      $gte: new Date(today.setHours(0, 0, 0, 0)),
      $lt: new Date(today.setHours(23, 59, 59, 999)),
    },
  });
  return `BK${dateStr}-${count + 1}`;
};

export default generateBookingId;