import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import path from "path";
import fs from "fs";

// Create or Update Service Man Profile
export const createServiceManProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const {
    categoryIds,
    name,
    email,
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

  if (categoryIds && !categoryIds.length) {
    throw new ApiError(400, "At least one category is required");
  };

  let newImagePath = null;

  try {
    if (req.files?.profileImage?.[0]) {
      newImagePath = await compressImage(req.files.profileImage[0].buffer, "servicemanProfile");
    };

    let profile = await ServiceManProfileModel.findOne({ userId });

    if (profile) {
      if (newImagePath && profile.profileImage) {
        const oldImagePath = path.join(process.cwd(), profile.profileImage);
        if (fs.existsSync(oldImagePath)) {
          await fs.promises.unlink(oldImagePath);
        };
      };

      const updatedData = {
        ...req.body,
        updatedBy: userId,
      };

      if (newImagePath) updatedData.profileImage = newImagePath;

      profile.set(updatedData);
      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: profile,
      });
    };

    profile = await ServiceManProfileModel.create({
      userId,
      categoryIds,
      name,
      email,
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
      profileImage: newImagePath,
      createdBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    if (newImagePath && fs.existsSync(path.join(process.cwd(), newImagePath))) {
      await fs.promises.unlink(path.join(process.cwd(), newImagePath)).catch(() => { });
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get Single Profile by ID
export const getServiceManProfileById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const profile = await ServiceManProfileModel
    .findOne({ userId })
    .populate("categories")
    .populate("user")
    .populate("kyc");

  if (!profile) throw new ApiError(404, "Profile not found");

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: profile,
  });
});
