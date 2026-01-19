import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  customerName: {
    type: String,
    trim: true,
  },
  invoiceNumber: {
    type: String,
    trim: true,
  },
  deliveryAddress: {
    type: String,
    trim: true,
  },
  invoiceDate: {
    type: String,
    trim: true,
  },
  stateName: {
    type: String,
    trim: true,
  },
  stateCode: {
    type: String,
    trim: true,
  },
  bookingDetail: {
    type: mongoose.Schema.Types.Mixed,
  },
  bookingItemDetail: [{
    type: mongoose.Schema.Types.Mixed,
  }],
  servicemanDetail: {
    type: mongoose.Schema.Types.Mixed,
  },
  companyDetail: {
    businessGSTIN: String,
    address: String,
    companyName: String,
    businessName: String,
    stateName: String,
    stateCode: String,
    authorizedSignature: String,
  },
}, { timestamps: true });

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);

export default InvoiceModel;