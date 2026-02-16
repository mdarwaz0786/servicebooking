import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    index: true,
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    index: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: [true, "Service ID is required"],
    index: true,
  },
  userId: {
    type: String,
    ref: "User",
    required: [true, "User ID is required"],
    index: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, "Quantity must be at least 1"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
