import mongoose from "mongoose";
import BookingItemModel from "../models/bookingItem.model.js";

export const getBookingWarrantyDays = async (bookingId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Invalid bookingId");
    };

    const items = await BookingItemModel
      .find({ bookingId })
      .populate({
        path: "service",
        select: "name warrantyDays",
      })
      .lean();

    if (!items.length) return [];

    const warrantyData = items?.map((item) => ({
      bookingId: item?.bookingId,
      bookingItemId: item?._id,
      serviceId: item?.service?._id,
      serviceName: item.service?.name,
      warrantyDays: item?.service?.warrantyDays || 0,
    }));

    return warrantyData;

  } catch (error) {
    throw error;
  };
};
