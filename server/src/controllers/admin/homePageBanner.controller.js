import fs from "fs";
import path from "path";
import HomePageBannerModel from "../../models/homePageBanner.model.js";
import compressImage from "../../helpers/compressImage.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Helper to remove file if any error occurs
const removeFile = (filePath) => {
  if (filePath && fs.existsSync(path.join(process.cwd(), filePath))) {
    fs.unlinkSync(path.join(process.cwd(), filePath));
  };
};

// Create Banner
export const createHomePageBanner = asyncHandler(async (req, res) => {
  const { title, link, status } = req.body;
  const userId = req.user?._id;

  let imagePath = null;
  let mobileBannerPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "homePageBanner");
    };

    if (req.files?.mobileBanner?.[0]) {
      mobileBannerPath = await compressImage(req.files.mobileBanner[0].buffer, "homePageBanner");
    };

    const newBanner = await HomePageBannerModel.create({
      image: imagePath,
      mobileBanner: mobileBannerPath,
      title,
      link,
      status: status !== undefined ? status : true,
      createdBy: userId,
    });

    return res.status(201).json({ success: true, message: "Created successfully", data: newBanner });
  } catch (error) {
    removeFile(imagePath);
    removeFile(mobileBannerPath);
    throw error;
  };
});

// Update Banner
export const updateHomePageBanner = asyncHandler(async (req, res) => {
  const { title, link, status } = req.body;
  const userId = req.user?._id;

  const banner = await HomePageBannerModel.findById(req.params.id);
  if (!banner) throw new ApiError(404, "Banner not found");

  try {
    if (req.files?.image?.[0]) {
      if (banner.image && fs.existsSync(path.join(process.cwd(), banner.image))) {
        fs.unlinkSync(path.join(process.cwd(), banner.image));
      };
      banner.image = await compressImage(req.files.image[0].buffer, "homePageBanner");
    };

    if (req.files?.mobileBanner?.[0]) {
      if (banner.mobileBanner && fs.existsSync(path.join(process.cwd(), banner.mobileBanner))) {
        fs.unlinkSync(path.join(process.cwd(), banner.mobileBanner));
      };
      banner.mobileBanner = await compressImage(req.files.mobileBanner[0].buffer, "homePageBanner");
    };

    if (title) banner.title = title;
    if (link) banner.link = link;
    if (status !== undefined) banner.status = status;
    banner.updatedBy = userId;

    await banner.save();

    return res.status(200).json({ success: true, message: "Updated successfully", data: banner });
  } catch (error) {
    throw error;
  };
});

// Get all Banners
export const getHomePageBanners = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 10 } = req.query;

  const filters = {};
  if (status !== undefined) filters.status = status === "true";
  if (search) filters.title = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  const banners = await HomePageBannerModel.find(filters)
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .lean();

  const total = await HomePageBannerModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
    data: banners,
  });
});

// Get single Banner
export const getHomePageBannerById = asyncHandler(async (req, res) => {
  const banner = await HomePageBannerModel.findById(req.params.id).lean();
  if (!banner) throw new ApiError(404, "Banner not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: banner });
});

// Delete Banner
export const deleteHomePageBanner = asyncHandler(async (req, res) => {
  const banner = await HomePageBannerModel.findById(req.params.id);
  if (!banner) throw new ApiError(404, "Banner not found");

  if (banner.image) removeFile(banner.image);
  if (banner.mobileBanner) removeFile(banner.mobileBanner);

  await banner.deleteOne();

  return res.status(200).json({ success: true, message: "Dleted successfully" });
});
