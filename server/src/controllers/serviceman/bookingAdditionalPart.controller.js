import BookingAdditionalPartModel from "../../models/BookingAdditionalPart.model.js";
import BookingModel from "../../models/booking.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";

// ================= CREATE ADDITIONAL PARTS =================
export const createBookingAdditionalParts = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { bookingId, servicemanBookingId, parts } = req.body;

  if (!bookingId) throw new ApiError(400, "Booking ID is required");
  if (!servicemanBookingId) throw new ApiError(400, "Serviceman Booking ID is required");
  if (!Array.isArray(parts) || parts.length === 0) throw new ApiError(400, "Additional Parts must be a non-empty array");

  const booking = await BookingModel.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  };

  let additionalPartTotalAmount = 0;

  const documents = parts?.map((item) => {
    const unitPrice = Number(item?.unitPrice) || 0;
    const quantity = Number(item?.quantity) || 1;

    const partTotal = unitPrice * quantity;
    additionalPartTotalAmount += partTotal;

    return {
      bookingId,
      rateId: item?.rateId,
      description: item?.description,
      unitPrice,
      quantity,
      price: item?.price || 0,
      discount: item?.discount || 0,
      laborCharge: item?.labourCharge || 0,
      oldAmount: {
        laborCharge: item?.labourCharge || 0,
        price: item?.price || 0,
        discount: item?.discount || 0,
      },
      groupTitle: item?.groupTitle,
      serviceItemId: item?.serviceItemId,
      createdBy: userId,
    };
  });

  const oldAmount = Number(booking?.amount) || 0;
  const oldPayableAmount = Number(booking?.payableAmount) || 0;
  // const oldDiscountAmount = Number(booking?.discountAmount) || 0;
  // const gstPercent = Number(booking?.gstPercent) || 0;

  const updatedAmount = oldAmount + additionalPartTotalAmount;
  const updatedPayableAmount = oldPayableAmount + additionalPartTotalAmount;

  // let updatedDiscountAmount = 0;

  // if (oldAmount > 0 && oldDiscountAmount > 0) {
  //   const discountPercent = oldDiscountAmount / oldAmount;
  //   updatedDiscountAmount = updatedAmount * discountPercent;
  // };

  // const gstAmount = (updatedAmount * gstPercent) / 100;
  // const payableAmount = updatedAmount + gstAmount - updatedDiscountAmount;

  const nowUTC = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(nowUTC.getTime() + istOffset);
  const timer = new Date(nowIST.getTime() + 5 * 60 * 1000);

  await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      status: "partstatusnew",
      additionalPartAmount: additionalPartTotalAmount,
      amount: updatedAmount,
      // discountAmount: updatedDiscountAmount,
      // gstAmount,
      payableAmount: updatedPayableAmount,
      updatedBy: userId,
      timer,
      updatedAt: new Date(),
    },
    { new: true }
  );

  if (servicemanBookingId) {
    await ServiceManBookingModel.findByIdAndUpdate(
      servicemanBookingId,
      {
        status: "partstatusnew",
        updatedBy: userId,
        updatedAt: new Date(),
      }
    );
  };

  await BookingAdditionalPartModel.insertMany(documents);

  return res.status(201).json({
    success: true,
    message: "Additional parts created successfully",
  });
});

// ================= CREATE ADDITIONAL PARTs CANCEL =================
export const bookingAdditionalPartsCancel = asyncHandler(async (req, res) => {

  const {
    bookingId,
    servicemanBookingId,
  } = req.body;

  await BookingModel.findByIdAndUpdate(
    bookingId,
    { status: "ongoing" },
    { new: true }
  );

  await ServiceManBookingModel.findByIdAndUpdate(
    servicemanBookingId,
    { status: "ongoing" },
    { new: true }
  );

  return res.status(201).json({
    success: true,
    message: "Cancelled successfully",
    data: {},
  });
});
