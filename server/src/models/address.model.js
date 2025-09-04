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
    maxlength: [50, "House number must not exceed 50 characters"],
  },
  landmark: {
    type: String,
    trim: true,
    maxlength: [150, "Landmark must not exceed 150 characters"],
  },
  deliveryPersonName: {
    type: String,
    trim: true,
    maxlength: [100, "Delivery person name must not exceed 100 characters"],
  },
  type: {
    type: String,
    enum: ["home", "other"],
    default: "home",
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
