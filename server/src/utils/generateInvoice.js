import InvoiceModel from "../models/invoice.model.js";
import { createInvoice } from "./invoice.js";
import { calculateAdminInvoiceAmount, calculateProviderInvoiceAmount } from "./wallet.utils.js";

export const generateInvoice = async (
  userId,
  bookingId,
  servicemanBookingId,
) => {
  const {
    booking: bookingDetail,
    bookingItems,
    serviceman: provider,
    customer,
    address,
    company,
  } = await createInvoice(userId, bookingId);

  const adminInvoiceAmount = await calculateAdminInvoiceAmount(bookingId);
  const providerInvoiceAmount = await calculateProviderInvoiceAmount(userId, bookingId);
  const totalInvoiceAmount = Number(adminInvoiceAmount) + Number(providerInvoiceAmount);

  const commonPayload = {
    adminInvoiceAmount,
    providerInvoiceAmount,
    totalInvoiceAmount,
    bookingId,
    servicemanBookingId,
    providerId: provider?._id,
    servicemanUserId: provider?.userId,
    customerId: customer?._id,
    customerName: customer?.name || "",
    customerEmail: customer?.email || "",
    customerMobile: customer?.mobile || "",
    customerProfileImage: customer?.profileImage || "",
    deliveryAddress: address?.houseNumber || "",
    landmark: address?.landmark || "",
    customerStateName: address?.stateName || "",
    custmerStateCode: address?.stateCode || "",
    bookingDetail: bookingDetail || {},
    bookingItemDetail: bookingItems || [],
    latestServicemanDetail: provider || {},
    companyDetail: company || {},
    customerDetail: customer || {},
    addressDetail: address || {},
  };

  await Promise.all([
    InvoiceModel.create({ type: "Customer", ...commonPayload }),
    InvoiceModel.create({ type: "Provider", ...commonPayload }),
    InvoiceModel.create({ type: "Admin", ...commonPayload }),
  ]);

  return {
    adminInvoiceAmount,
    providerInvoiceAmount,
    totalInvoiceAmount,
  };
};
