import UserModel from "../../models/user.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../helpers/generateToken.js";

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkStatus = await UserModel.findOne({ username, status: false }).select("+password");
    if (checkStatus) {
      return res.status(400).json({ success: false, message: "Your profile is not active." });
    };

    const user = await UserModel.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid username" });
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
