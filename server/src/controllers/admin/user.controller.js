import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import UserModel from "../../models/user.model.js";
import { buildPagination } from "../../utils/pagination.js";

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
    message: "Registered successfully",
    user,
    token: generateToken(user?._id),
  });
});

// Get All Users
export const getAllUsers = asyncHandler(async (req, res) => {
  let { search, role, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { mobile: { $regex: search, $options: "i" } },
    ];
  };

  if (role) {
    filters.role = role;
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  const users = await UserModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .select("-password")
    .lean();

  const total = await UserModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: users,
    pagination: buildPagination({ page, limit, total }),
  });
});
