import BookingItemModel from "../models/bookingItem.model.js";
import BookingWarrantyModel from "../models/bookingWarranty.model.js";

export const createBookingWarranty = async (
  bookingId,
  servicemanBookingId,
  userId,
) => {
  const items = await BookingItemModel
    .find({ bookingId })
    .populate({ path: "service", select: "warrantyDays" })
    .lean();

  if (!items.length) return;

  const today = new Date();

  const warrantyData = items
    .filter((item) => item?.service?.warrantyDays > 0)
    .map((item) => {
      const expiryDate = new Date(today);
      expiryDate.setDate(today.getDate() + item?.service?.warrantyDays);

      return {
        bookingId,
        bookingItemId: item?._id,
        servicemanBookingId,
        isWarranty: 1,
        expiryDate,
        createdBy: userId,
      };
    });

  if (warrantyData?.length) {
    await BookingWarrantyModel.insertMany(warrantyData);
  };
};
