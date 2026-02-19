import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import compressImage from "../../helpers/compressImage.js";
import path from "path";
import fs from "fs";

// Create Service Man Profile
export const createServiceManProfile = asyncHandler(async (req, res) => {
  const {
    userId,
    categoryIds,
    subCategoryIds,
    name,
    email,
    mobile,
    gender,
    dob,
    experienceLevel,
    companyName,
    yearOfExperience,
    permanentAddress,
    currentAddress,
    referenceName1,
    referenceMobile1,
    referenceName2,
    referenceMobile2,
  } = req.body;

  if (!categoryIds?.length) {
    throw new ApiError(400, "At least one category is required");
  };

  let imagePath = null;

  try {
    if (req.files?.profileImage?.[0]) {
      imagePath = await compressImage(req.files.profileImage[0].buffer, "servicemanProfile");
    };

    const profile = await ServiceManProfileModel.create({
      userId: userId,
      categoryIds,
      subCategoryIds,
      name,
      email,
      mobile,
      gender,
      dob,
      experienceLevel,
      companyName,
      yearOfExperience,
      permanentAddress,
      currentAddress,
      referenceName1,
      referenceMobile1,
      referenceName2,
      referenceMobile2,
      profileImage: imagePath,
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: profile,
    });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get All Service Man Profiles
export const getServiceManProfiles = asyncHandler(async (req, res) => {
  let { search, status, page, limit, sort = "desc", user, category, experienceLevel, profileStatus } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (status) filters.status = status;
  if (user) filters.userId = user;
  if (category) filters.categoryIds = category;
  if (experienceLevel) filters.experienceLevel = experienceLevel;
  if (profileStatus) filters.profileStatus = profileStatus;

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } },
    ];
  };

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const [profiles, total] = await Promise.all([
    ServiceManProfileModel
      .find(filters)
      .populate("categories")
      .populate("subCategories")
      .populate("user")
      .populate("kyc")
      .populate("zones")
      .populate("city")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    ServiceManProfileModel.countDocuments(filters),
  ]);

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
    data: profiles,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single Profile by ID
export const getServiceManProfileById = asyncHandler(async (req, res) => {
  const profile = await ServiceManProfileModel
    .findById(req.params.id)
    .populate("categories")
    .populate("subCategories")
    .populate("user")
    .populate("kyc")
    .populate("city")
    .populate("zones");

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

  if (req.files?.profileImage?.[0]) {
    const oldImagePath = profile.profileImage
      ? path.join(process.cwd(), profile.profileImage)
      : null;

    if (oldImagePath && fs.existsSync(oldImagePath)) {
      await fs.promises.unlink(oldImagePath);
    };

    profile.profileImage = await compressImage(
      req.files.profileImage[0].buffer,
      "servicemanProfile"
    );
  };

  const parseArray = (value) => {
    if (!value) return [];

    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      };
    };

    return value;
  };

  const updateData = { ...req.body };

  updateData.categoryIds = parseArray(req.body.categoryIds);
  updateData.subCategoryIds = parseArray(req.body.subCategoryIds);
  updateData.zones = parseArray(req.body.zones);

  updateData.updatedBy = req.user?._id;
  profile.set(updateData);

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

  if (profile.profileImage && fs.existsSync(path.join(process.cwd(), profile.profileImage))) {
    fs.unlinkSync(path.join(process.cwd(), profile.profileImage));
  };

  await profile.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
