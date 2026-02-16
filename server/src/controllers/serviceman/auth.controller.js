import UserModel from "../../models/user.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../helpers/generateToken.js";
import OtpModel from "../../models/otp.model.js";
import generateOtp from "../../utils/generateOpt.js";
import { sendSMS } from "../../utils/sms.js";

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  // const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // const UserRecord = await UserModel.findOne({ 'mobile': mobile, 'role': 'user' });
  // if (UserRecord) throw new ApiError(400, "Mobile exist in user account..");

  const options = {
    mobile: mobile,
    otp: otp,
    type: "teamVerification",
  };

  await sendSMS(options);

  await OtpModel.findOneAndUpdate(
    { mobile },
    { otp: otp, expiresAt },
    { upsert: true, new: true }
  );

  return res.status(200).json({
    success: true,
    message: "OTP sent to mobile number",
  });
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { mobile, fcmToken, otp } = req.body;

  const otpRecord = await OtpModel.findOne({ mobile });
  if (!otpRecord) throw new ApiError(400, "OTP not found. Please login again");

  if (otpRecord.otp !== Number(otp)) throw new ApiError(400, "Invalid OTP");
  if (otpRecord.expiresAt < new Date()) throw new ApiError(400, "OTP expired");

  await OtpModel.deleteOne({ mobile });

  let user = await UserModel.findOne({ mobile: mobile, role: "serviceman" }).populate("kyc profile");

  if (user?.status == false) {
    return res.status(403).json({
      success: false,
      message: "Your account is blocked",
      user: {}
    });
  };

  let isNew = 1;

  if (user) {
    user.fcmToken = fcmToken;
    await user.save();
  };

  if (!user) {
    isNew = 1;
    user = await UserModel.create({ mobile: mobile, fcmToken, role: "serviceman" });
  };
  if (user) isNew = 0;

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: user,
    isNew,
    token: generateToken(user?._id),
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

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  };

  await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        fcmToken: null,
        deviceId: null,
      },
    },
    { new: true },
  );

  return res.status(200).json({ success: true, message: "Logout successful" });
});
