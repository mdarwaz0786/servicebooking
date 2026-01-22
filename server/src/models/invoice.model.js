import mongoose from "mongoose";
import InvoiceCounter from "./invoiceCounter.model.js";

const invoiceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Admin", "Provider", "Customer"],
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  servicemanBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManBooking",
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceManProfile",
  },
  servicemanUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customerName: {
    type: String,
    default: '',
  },
  customerEmail: {
    type: String,
    default: '',
  },
  customerMobile: {
    type: String,
    default: '',
  },
  customerProfileImage: {
    type: String,
    default: '',
  },
  companyInvoiceNumber: {  // GIT25-001
    type: String,
    default: '',
  },
  providerInvoiceNumber: {   // GIP25-001
    type: String,
    default: '',
  },
  deliveryAddress: {
    type: String,
    default: '',
  },
  landmark: {
    type: String,
    default: '',
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  customerStateName: {
    type: String,
    default: '',
  },
  custmerStateCode: {
    type: String,
    default: '',
  },
  bookingDetail: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  bookingItemDetail: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  latestServicemanDetail: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  companyDetail: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  customerDetail: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  addressDetail: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

invoiceSchema.virtual("kyc", {
  ref: "KYC",
  localField: "servicemanUserId",
  foreignField: "userId",
  justOne: true,
  options: {
    sort: { createdAt: -1 },
    match: { status: "approved" },
  },
});

invoiceSchema.pre("save", async function (next) {
  if (this.companyInvoiceNumber && this.providerInvoiceNumber) {
    return next();
  };

  const year = new Date(this.invoiceDate).getFullYear().toString().slice(-2);

  if (!this.companyInvoiceNumber) {
    const companyCounter = await InvoiceCounter.findOneAndUpdate(
      { key: `company_${year}` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.companyInvoiceNumber = `GIT${year}-${String(companyCounter.seq).padStart(3, "0")}`;
  };

  if (!this.providerInvoiceNumber) {
    const providerCounter = await InvoiceCounter.findOneAndUpdate(
      { key: `provider_${year}` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.providerInvoiceNumber = `GIP${year}-${String(providerCounter.seq).padStart(3, "0")}`;
  };

  next();
});

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);

export default InvoiceModel;