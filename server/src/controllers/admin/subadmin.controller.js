import UserModel from "../../models/user.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import compressImage from "../../helpers/compressImage.js";

/**
 * CREATE SUBADMIN
 */
export const createSubAdmin = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    mobile,
    username,
    password,
    dob,
    address,
    cityName,
    stateName,
    pinCode,
    permissions,
  } = req.body;

  if (!mobile) throw new ApiError(400, "Mobile number is required");
  if (!username) throw new ApiError(400, "Username is required");
  if (!password) throw new ApiError(400, "Password is required");

  const exists = await UserModel.findOne({ username });
  if (exists) throw new ApiError(400, "Username already exists");

  let imagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "user");
    };

    const subadmin = await UserModel.create({
      name,
      email,
      mobile,
      username,
      password,
      profileImage: imagePath,
      dob,
      address,
      cityName,
      stateName,
      pinCode,
      permissions,
      role: "subadmin",
    });

    return res.status(201).json({
      success: true,
      data: subadmin,
    });
  } catch (err) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    console.error("Image processing error:", err);
  }
});

/**
 * GET ALL SUBADMINS
 */
export const getSubAdmins = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = { role: "subadmin" };

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else sortOption = { createdAt: -1 };

  const subadmins = await UserModel.find(filters)
    .select("-password -status -isKycUpdate")
    .populate("permissions", "roleName", "cityName",)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
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
    data: subadmins,
    pagination: buildPagination({ page, limit, total }),
  });
});

/**
 * GET SUBADMIN BY ID
 */
export const getSubAdminById = asyncHandler(async (req, res) => {
  const subadmin = await UserModel.findOne({
    _id: req.params.id,
    role: "subadmin",
  })
    .select("-password -status -isKycUpdate")
    .populate("permissions")
    .populate("cityName");

  if (!subadmin) {
    throw new ApiError(404, "SubAdmin not found");
  }

  return res.status(200).json({
    success: true,
    data: subadmin,
  });
});

/**
 * UPDATE SUBADMIN
 */
export const updateSubAdmin = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    mobile,
    username,
    password,
    profileImage,
    dob,
    address,
    cityName,
    stateName,
    pinCode,
    permissions,
  } = req.body;

  const subadmin = await UserModel.findOne({
    _id: req.params.id,
    role: "subadmin",
  });

  if (!subadmin) throw new ApiError(404, "SubAdmin not found");

  if (username && username !== subadmin.username) {
    const exists = await UserModel.findOne({ username });
    if (exists) throw new ApiError(400, "Username already exists");
  }

  if (req.files?.image?.[0]) {
    if (subadmin.profileImage && fs.existsSync(path.join(process.cwd(), subadmin.profileImage))) {
      fs.unlinkSync(path.join(process.cwd(), subadmin.profileImage));
    };
    subadmin.profileImage = await compressImage(req.files.image[0].buffer, "user");
  };

  subadmin.name = name ?? subadmin.name;
  subadmin.email = email ?? subadmin.email;
  subadmin.mobile = mobile ?? subadmin.mobile;
  subadmin.username = username ?? subadmin.username;
  subadmin.profileImage = profileImage ?? subadmin.profileImage;
  subadmin.dob = dob ?? subadmin.dob;
  subadmin.address = address ?? subadmin.address;
  subadmin.cityName = cityName ?? subadmin.cityName;
  subadmin.stateName = stateName ?? subadmin.stateName;
  subadmin.pinCode = pinCode ?? subadmin.pinCode;
  subadmin.permissions = permissions ?? subadmin.permissions;

  if (password) subadmin.password = password;

  subadmin.updatedAt = new Date();

  await subadmin.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: subadmin,
  });
});

/**
 * DELETE SUBADMIN
 */
export const deleteSubAdmin = asyncHandler(async (req, res) => {
  const subadmin = await UserModel.findOne({
    _id: req.params.id,
    role: "subadmin",
  });

  if (!subadmin) throw new ApiError(404, "User not found");

  await subadmin.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
