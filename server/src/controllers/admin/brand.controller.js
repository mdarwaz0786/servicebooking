import BrandModel from "../../models/brand.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

export const createBrand = asyncHandler(async (req, res) => {
  const { name, code, description } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Brand name is required");
  }

  let imagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "brands");
    }

    const brand = await BrandModel.create({
      name,
      code,
      description,
      image: imagePath,
      createdBy: req.user?._id
    });

    const slug = await generateUniqueSlug(name, "Brand", brand._id, "brands");
    brand.slug = slug;
    await brand.save();

    return res.status(201).json({ success: true, data: brand });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    }
    if (error.code === 11000) {
      throw new ApiError(409, "Brand already exists");
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getBrands = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const brands = await BrandModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BrandModel.countDocuments(filters);
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
    data: brands,
    pagination: buildPagination({ page, limit, total })
  });
});

export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await BrandModel.findById(req.params.id);

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  return res.status(200).json({ success: true, data: brand });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const { name, code, description, status } = req.body;

  const brand = await BrandModel.findById(req.params.id);
  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  if (req.files?.image?.[0]) {
    if (brand.image && fs.existsSync(path.join(process.cwd(), brand.image))) {
      fs.unlinkSync(path.join(process.cwd(), brand.image));
    }
    brand.image = await compressImage(req.files.image[0].buffer, "brands");
  }

  if (name && name !== brand.name) {
    await SlugModel.deleteOne({
      collectionName: "Brand",
      documentId: brand?._id
    });

    const newSlug = await generateUniqueSlug(name, "Brand", brand?._id, "brands");
    brand.slug = newSlug;
  }

  brand.name = name !== undefined ? name : brand.name;
  brand.code = code !== undefined ? code : brand.code;
  brand.status = typeof status === "boolean" ? status : brand.status;
  brand.description = description !== undefined ? description : brand.description;
  brand.updatedBy = req.user?._id;
  brand.updatedAt = new Date();

  await brand.save();

  return res.status(200).json({ success: true, data: brand });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await BrandModel.findById(req.params.id);
  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  if (brand.image && fs.existsSync(path.join(process.cwd(), brand.image))) {
    fs.unlinkSync(path.join(process.cwd(), brand.image));
  }

  await SlugModel.deleteOne({
    collectionName: "Brand",
    documentId: brand?._id
  });

  await brand.deleteOne();

  return res.status(200).json({ success: true, message: "Brand deleted successfully" });
});
