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

  if (!req.file || !req.file.buffer) throw new ApiError(400, "Image is required");

  let imagePath;

  try {
    imagePath = await compressImage(req.file.buffer, "homePageSlider");
    const newSlider = await HomePageSliderModel.create({
      image: imagePath,
      title,
      link,
      status: status !== undefined ? status : true,
      createdBy: userId,
    });

    return res.status(201).json({ success: true, message: "Created successfully", data: newSlider });
  } catch (error) {
    removeFile(imagePath);
    throw error;
  };
});

// Update Slider
export const updateHomePageSlider = asyncHandler(async (req, res) => {
  const { title, link, status } = req.body;
  const userId = req.user?._id;

  const slider = await HomePageSliderModel.findById(req.params.id);
  if (!slider) throw new ApiError(404, "Slider not found");

  let oldImage = slider.image;
  let newImagePath;

  try {
    if (req.file && req.file.buffer) {
      newImagePath = await compressImage(req.file.buffer, "homePageSlider");
      slider.image = newImagePath;
    };

    if (title) slider.title = title;
    if (link) slider.link = link;
    if (status !== undefined) slider.status = status;
    slider.updatedBy = userId;

    await slider.save();

    if (newImagePath && oldImage) removeFile(oldImage);

    return res.status(200).json({ success: true, message: "Updated successfully", data: slider });
  } catch (error) {
    if (newImagePath) removeFile(newImagePath);
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
