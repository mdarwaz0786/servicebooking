import BrandLogoModel from "../../models/brandLogo.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE BRAND LOGO ---------------------
export const createBrandLogo = asyncHandler(async (req, res) => {
  const { mainTitle, description } = req.body;

  if (!mainTitle || !mainTitle.trim()) {
    throw new ApiError(400, "Main title is required");
  };

  let iconsPaths = [];

  try {
    if (req.files?.icons?.length) {
      for (const file of req.files.icons) {
        const compressedPath = await compressImage(file.buffer, "service");
        iconsPaths.push(compressedPath);
      };
    };

    const brandLogo = await BrandLogoModel.create({
      mainTitle,
      description,
      icons: iconsPaths,
    });

    return res.status(201).json({ success: true, message: "Created successfully", data: brandLogo });
  } catch (error) {
    iconsPaths.forEach((p) => {
      if (p && fs.existsSync(path.join(process.cwd(), p))) {
        fs.unlinkSync(path.join(process.cwd(), p));
      };
    });
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// --------------------- GET ALL BRAND LOGOS ---------------------
export const getBrandLogos = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.mainTitle = { $regex: search, $options: "i" };
  };

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const brandLogos = await BrandLogoModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BrandLogoModel.countDocuments(filters);
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
    data: brandLogos,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE BRAND LOGO ---------------------
export const getBrandLogoById = asyncHandler(async (req, res) => {
  const brandLogo = await BrandLogoModel.findById(req.params.id).lean();
  if (!brandLogo) {
    throw new ApiError(404, "Brand logo not found");
  };
  return res.status(200).json({ success: true, message: "Data fetched successfully", data: brandLogo });
});

// --------------------- UPDATE BRAND LOGO ---------------------
export const updateBrandLogo = asyncHandler(async (req, res) => {
  const { mainTitle, description } = req.body;

  let existingIcons = [];
  if (req.body.existingIcons) {
    try {
      existingIcons = JSON.parse(req.body.existingIcons);
    } catch (err) {
      throw new ApiError(400, "Invalid existingIcons format");
    };
  };

  const brandLogo = await BrandLogoModel.findById(req.params.id);
  if (!brandLogo) {
    throw new ApiError(404, "Brand logo not found");
  };

  let updatedIcons = [];

  if (existingIcons.length > 0) {
    updatedIcons = brandLogo.icons.filter((icon) => existingIcons.includes(icon));

    brandLogo.icons.forEach((icon) => {
      if (!existingIcons.includes(icon) && fs.existsSync(path.join(process.cwd(), icon))) {
        fs.unlinkSync(path.join(process.cwd(), icon));
      };
    });
  } else {
    brandLogo.icons.forEach((icon) => {
      if (fs.existsSync(path.join(process.cwd(), icon))) fs.unlinkSync(path.join(process.cwd(), icon));
    });
  };

  if (req.files?.icons?.length) {
    for (const file of req.files.icons) {
      const compressedPath = await compressImage(file.buffer, "service");
      updatedIcons.push(compressedPath);
    };
  };

  brandLogo.icons = updatedIcons;
  brandLogo.mainTitle = mainTitle || brandLogo.mainTitle;
  brandLogo.description = description || brandLogo.description;

  await brandLogo.save();

  return res.status(200).json({
    success: true,
    message: "Brand logo updated successfully",
    data: brandLogo
  });
});

// --------------------- DELETE BRAND LOGO ---------------------
export const deleteBrandLogo = asyncHandler(async (req, res) => {
  const brandLogo = await BrandLogoModel.findById(req.params.id);
  if (!brandLogo) {
    throw new ApiError(404, "Brand logo not found");
  };

  brandLogo.icons.forEach((iconPath) => {
    if (iconPath && fs.existsSync(path.join(process.cwd(), iconPath))) {
      fs.unlinkSync(path.join(process.cwd(), iconPath));
    };
  });

  await brandLogo.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
