import ServiceManProfileModel from "../../models/ServiceManProfile.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Create ServiceMan Profile
export const createServiceManProfile = asyncHandler(async (req, res) => {
  const {
    userId,
    categories,
    name,
    email,
    dob,
    workingHistory,
    permanentAddress,
    currentAddress,
    referenceName1,
    referenceMobile1,
    referenceName2,
    referenceMobile2,
    profileImage,
  } = req.body;

  if (!categories?.length) {
    throw new ApiError(400, "At least one category is required");
  };

  const profile = await ServiceManProfileModel.create({
    userId,
    categories,
    name,
    email,
    dob,
    workingHistory,
    permanentAddress,
    currentAddress,
    referenceName1,
    referenceMobile1,
    referenceName2,
    referenceMobile2,
    profileImage,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: profile,
  });
});

// Get All Profiles
export const getServiceManProfiles = asyncHandler(async (req, res) => {
  let { search, status, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (status) filters.status = status;

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { referenceName1: { $regex: search, $options: "i" } },
      { referenceName2: { $regex: search, $options: "i" } },
      { referenceMobile1: { $regex: search, $options: "i" } },
      { referenceMobile2: { $regex: search, $options: "i" } },
    ];
  };

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const [profiles, total] = await Promise.all([
    ServiceManProfileModel.find(filters)
      .populate("categories")
      .populate("user",)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    ServiceManProfileModel.countDocuments(filters),
  ]);

  return res.status(200).json({
    success: true,
    message: "Profiles fetched successfully",
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasPrevPage: page > 1,
    hasNextPage: page < Math.ceil(total / limit),
    data: profiles,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single Profile by ID
export const getServiceManProfileById = asyncHandler(async (req, res) => {
  const profile = await ServiceManProfileModel
    .findById(req.params.id)
    .populate("categories")
    .populate("user",);

  if (!profile) throw new ApiError(404, "Profile not found");

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: profile,
  });
});

// Update Profile
export const updateServiceManProfile = asyncHandler(async (req, res) => {
  const profile = await ServiceManProfileModel.findById(req.params.id);
  if (!profile) throw new ApiError(404, "Profile not found");

  Object.assign(profile, req.body, { updatedBy: req.user?._id });
  await profile.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: profile,
  });
});

// Delete Profile
export const deleteServiceManProfile = asyncHandler(async (req, res) => {
  const profile = await ServiceManProfileModel.findById(req.params.id);
  if (!profile) throw new ApiError(404, "Profile not found");

  await profile.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
