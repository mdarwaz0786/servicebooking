import UserModel from "../../models/user.model.js";
import CartModel from "../../models/cart.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../helpers/generateToken.js";
import OtpModel from "../../models/otp.model.js";
import compressImage from "../../helpers/compressImage.js";
import generateOtp from "../../utils/generateOpt.js";

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

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

// Update Profile
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Unauthorized");

  const { name, email, mobile, dob } = req.body;

  // Fetch existing user
  const user = await UserModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Validate email if updating
  if (email) {
    const emailExists = await UserModel.findOne({ email, _id: { $ne: userId } });
    if (emailExists) throw new ApiError(400, "Email is already taken");
  }

  // Validate mobile if updating
  // if (mobile) {
  //   const mobileExists = await UserModel.findOne({ mobile, _id: { $ne: userId } });
  //   if (mobileExists) throw new ApiError(400, "Mobile number already registered");
  // }

  if (req.files?.profileImage?.[0]) {
    if (user.profileImage && fs.existsSync(path.join(process.cwd(), user.profileImage))) {
      fs.unlinkSync(path.join(process.cwd(), user.profileImage));
    };
    user.profileImage = await compressImage(req.files.profileImage[0].buffer, "user");
  };

  // Update fields safely
  user.name = name || user?.name;
  user.email = email || user?.email;
  // user.mobile = mobile || user?.mobile;
  user.dob = dob || user?.dob;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
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
