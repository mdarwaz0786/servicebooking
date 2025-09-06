import UserModel from "../../models/user.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../helpers/generateToken.js";

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, role } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
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

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { mobile, password } = req.body;

  const user = await UserModel.findOne({ mobile });
  if (!user) {
    throw new ApiError(401, "Invalid mobile or password");
  };

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid mobile or password");
  };

  return res.status(200).json({
    success: true,
    user: {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
      role: user?.role,
    },
    token: generateToken(user?._id),
  });
});
