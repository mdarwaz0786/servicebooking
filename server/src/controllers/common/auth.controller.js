import UserModel from "../../models/user.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../helpers/generateToken.js";
import OtpModel from "../../models/otp.model.js";

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, role } = req.body;

  const existingUserByEmail = await UserModel.findOne({ email });
  if (existingUserByEmail) {
    throw new ApiError(400, "User already exists with this email id");
  };

  const existingUserByMobile = await UserModel.findOne({ mobile });
  if (existingUserByMobile) {
    throw new ApiError(400, "User already exists with this mobile number");
  };

  const user = await UserModel.create({ name, email, mobile, password, role });

  if (!user) {
    throw new ApiError(400, "Invalid user data");
  };

  return res.status(201).json({
    success: true,
    user: {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
      role: user?.role,
    },
    token: generateToken(user._id),
  });
});

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
  const { mobile, otp } = req.body;

  const otpRecord = await OtpModel.findOne({ mobile });
  if (!otpRecord) throw new ApiError(400, "OTP not found. Please login again");

  if (otpRecord.otp !== Number(otp)) throw new ApiError(400, "Invalid OTP");
  if (otpRecord.expiresAt < new Date()) throw new ApiError(400, "OTP expired");

  await OtpModel.deleteOne({ mobile });

  let user = await UserModel.findOne({ mobile });

  if (!user) {
    user = await UserModel.create({ mobile });
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
    data: req.user,
  });
});
