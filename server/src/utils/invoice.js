import BookingModel from "../models/booking.model.js";
import BookingItemModel from "../models/bookingItem.model.js";
import ServiceManBookingModel from "../models/servicemanBooking.model.js";
import ServiceManProfile from "../models/servicemanProfile.model.js";
import CompanyModel from "../models/company.model.js";

export const createInvoice = async (bookingId = "6966154e5c6b2c9066c04130") => {
  const booking = await BookingModel
    .populate({ path: "user", select: "-password" })
    .populate("address")

  const bookingItems = await BookingItemModel
    .find({ bookingId: bookingId })
    .populate({ path: "service", select: "-shortDescription -fullDescription" })
    .populate({ path: "additionalParts" })
    .lean();

  const latestServicemanAssignment = await ServiceManBookingModel
    .findOne({ bookingId: bookingId })
    .sort({ createdAt: -1 })
    .lean();

  const company = await CompanyModel.findOne();

  const servicemanId = latestServicemanAssignment?.servicemanId;
  const serviceman = await ServiceManProfile.findOne({ _id: servicemanId }).populate("user");

  const customer = booking?.user;
  const address = booking?.aaddress;

  return { serviceman, customer, address, company, booking, bookingItems };
};