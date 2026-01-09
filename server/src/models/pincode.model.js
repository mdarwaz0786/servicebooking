import mongoose from "mongoose";

const pincodeSchema = new mongoose.Schema({
  placeName: {
    type: String,
    trim: true,
    required: [true, "Place name is required"],
  },
  pincoode: {
    type: Number,
    required: [true, "Pincode is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

const PincodeModel = mongoose.model("Pincode", pincodeSchema);

export default PincodeModel;
