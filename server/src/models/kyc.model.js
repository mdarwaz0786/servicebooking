import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  bankName: {
    type: String,
    required: true,
    trim: true,
  },
  branchName: {
    type: String,
    required: true,
    trim: true,
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true,
  },
  ifscCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  passbookOrCheque: {
    type: String,
    required: false,
  },
  panCardNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  panCardImage: {
    type: String,
    required: false,
  },
  aadharCardNumber: {
    type: String,
    required: true,
    trim: true,
  },
  aadharFrontImage: {
    type: String,
    required: false,
  },
  aadharBackImage: {
    type: String,
    required: false,
  },
  gstNumber: {
    type: String,
    required: false,
    trim: true,
  },
  shopImage: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  remarks: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

kycSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

kycSchema.virtual("profile", {
  ref: "ServiceManProfile",
  localField: "userId",
  foreignField: "userId",
  justOne: true,
});

const KycModel = mongoose.model("KYC", kycSchema);

export default KycModel;
