import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
    index: true,
  },
  houseNumber: {
    type: String,
    required: [true, "House number is required"],
    trim: true,
  },
  landmark: {
    type: String,
    trim: true,
  },
  deliveryPersonName: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["home", "other"],
    default: "home",
  },
  lat: {
    type: String,
  },
  long: {
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
}, { timestamps: true });

addressSchema.index({ userId: 1 });

const AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel;
