import UserModel from "../../models/user.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../helpers/generateToken.js";

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
    message: "User registered successfully",
    user,
    token: generateToken(user?._id),
  });
});

// Login user
export const loginUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await UserModel.findOne({ mobile }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid mobile number" });
    };

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token: generateToken(user?._id),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  };
};

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
