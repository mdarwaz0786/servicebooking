import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  businessName: {
    type: String,
    trim: true,
  },
  businessGSTIN: {
    type: String,
    trim: true,
    uppercase: true,
    index: true,
  },
  address: {
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
  authorizedSignature: {   // image
    type: String,
    default: "",
  },
  qrCode: {        // image
    type: String,
    default: "",
  },
}, { timestamps: true });

const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
