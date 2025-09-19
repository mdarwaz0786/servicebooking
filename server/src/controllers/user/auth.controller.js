import UserModel from "../../models/user.model.js";
import CartModel from "../../models/cart.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../helpers/generateToken.js";
import OtpModel from "../../models/otp.model.js";

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await OtpModel.findOneAndUpdate(
    { mobile },
    { otp: 1234, expiresAt },
    { upsert: true, new: true }
  );

  return res.status(200).json({
    success: true,
    message: "OTP sent to mobile number",
  });
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { mobile, otp, userId } = req.body;

  const otpRecord = await OtpModel.findOne({ mobile });
  if (!otpRecord) throw new ApiError(400, "OTP not found. Please login again");

  if (otpRecord.otp !== Number(otp)) throw new ApiError(400, "Invalid OTP");
  if (otpRecord.expiresAt < new Date()) throw new ApiError(400, "OTP expired");

  await OtpModel.deleteOne({ mobile });

  let user = await UserModel.findOne({ mobile });

  if (!user) {
    user = await UserModel.create({ mobile: mobile, role: "user" });
  };

  if (userId) {
    await CartModel.updateMany(
      { userId: userId },
      { $set: { userId: user._id } }
    );
  };

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user,
    token: generateToken(user._id),
  });
});

// Get logged in user
export const loggedInUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: req.user,
  });
});
