import fs from "fs";
import path from "path";
import HomePageSliderModel from "../../models/homePageSlider.model.js";
import compressImage from "../../helpers/compressImage.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Helper to remove file if any error occurs
const removeFile = (filePath) => {
  if (filePath && fs.existsSync(path.join(process.cwd(), filePath))) {
    fs.unlinkSync(path.join(process.cwd(), filePath));
  };
};

// Create Slider
export const createHomePageSlider = asyncHandler(async (req, res) => {
  const { title, link, status } = req.body;
  const userId = req.user?._id;

  let imagePath = null;
  let mobileBannerPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "homePageSlider");
    };

    if (req.files?.mobileBanner?.[0]) {
      mobileBannerPath = await compressImage(req.files.mobileBanner[0].buffer, "homePageSlider");
    };

    const newSlider = await HomePageSliderModel.create({
      image: imagePath,
      mobileBanner: mobileBannerPath,
      title,
      link,
      status: status !== undefined ? status : true,
      createdBy: userId,
    });

    return res.status(201).json({ success: true, message: "Created successfully", data: newSlider });
  } catch (error) {
    removeFile(imagePath);
    removeFile(mobileBannerPath);
    throw error;
  };
});

// Update Slider
export const updateHomePageSlider = asyncHandler(async (req, res) => {
  const { title, link, status } = req.body;
  const userId = req.user?._id;

  const slider = await HomePageSliderModel.findById(req.params.id);
  if (!slider) throw new ApiError(404, "Slider not found");

  try {
    if (req.files?.image?.[0]) {
      if (slider.image && fs.existsSync(path.join(process.cwd(), slider.image))) {
        fs.unlinkSync(path.join(process.cwd(), slider.image));
      };
      slider.image = await compressImage(req.files.image[0].buffer, "homePageBanner");
    };

    if (req.files?.mobileBanner?.[0]) {
      if (slider.mobileBanner && fs.existsSync(path.join(process.cwd(), slider.mobileBanner))) {
        fs.unlinkSync(path.join(process.cwd(), slider.mobileBanner));
      };
      slider.mobileBanner = await compressImage(req.files.mobileBanner[0].buffer, "homePageBanner");
    };

    if (title) slider.title = title;
    if (link) slider.link = link;
    if (status !== undefined) slider.status = status;
    slider.updatedBy = userId;

    await slider.save();

    return res.status(200).json({ success: true, message: "Updated successfully", data: slider });
  } catch (error) {
    throw error;
  };
});

// Get all Sliders
export const getHomePageSliders = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 10 } = req.query;

  const filters = {};
  if (status !== undefined) filters.status = status === "true";
  if (search) filters.title = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  const sliders = await HomePageSliderModel.find(filters)
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .lean();

  const total = await HomePageSliderModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
    data: sliders,
  });
});

// Get single Slider
export const getHomePageSliderById = asyncHandler(async (req, res) => {
  const slider = await HomePageSliderModel.findById(req.params.id).lean();
  if (!slider) throw new ApiError(404, "Slider not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: slider });
});

// Delete Slider
export const deleteHomePageSlider = asyncHandler(async (req, res) => {
  const slider = await HomePageSliderModel.findById(req.params.id);
  if (!slider) throw new ApiError(404, "Slider not found");

  if (slider.image) removeFile(slider.image);

  await slider.deleteOne();

  return res.status(200).json({ success: true, message: "Dleted successfully" });
});
