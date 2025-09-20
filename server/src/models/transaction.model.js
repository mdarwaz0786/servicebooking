import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: false,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: false,
  },
  phone: {
    type: String,
    trim: true,
    required: false,
  },
  PID: {
    type: String, // Booking Id
    required: true,
    type: String, // Product ID or Payment ID
    required: false,
    index: true,
  },
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  productType: {
    type: String, // e.g. "purchase", "subscription", etc.
    trim: true,
  },
  type: {
    type: Number, // e.g. "1 = add", "2 = deduct"
    trim: true,
  },
  itemData: {
    type: mongoose.Schema.Types.Mixed, // for flexibility (array/object)
  },
  paymentBy: {
    type: String, // e.g. "razorpay", "stripe", "paypal"
    required: true,
  },
  transactionId: {
    type: String,
    unique: false,
    required: false,
    index: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  gstPercent: {
    type: String,
    default: 0,
    min: 0,
  },
  finalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed", "refunded"],
    default: "pending",
  },
  paymentDate: {
    type: Date,
    required: false,
  },
  paymentTime: {
    type: String,
  },
}, { timestamps: true });

const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
