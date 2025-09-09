import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: Number,
    required: true,
    min: 1000,
    max: 9999,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpModel = mongoose.model("Otp", otpSchema);

export default OtpModel;
