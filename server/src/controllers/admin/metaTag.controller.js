import MetaTagModel from "../../models/metaTag.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";
import compressImage from "../../helpers/compressImage.js";
import { generateMetaSlug } from "../../helpers/generateMetaSlug.js";

// --------------------- CREATE META TAG ---------------------
export const createMetaTag = asyncHandler(async (req, res) => {
  const {
    pageName,
    slug,
    metaTitle,
    metaAuthor,
    metaKeywords,
    metaDescription,
    canonicalTag,
  } = req.body;

  if (!slug) {
    throw new ApiError(400, "Slug is required");
  }

  let imagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "meta");
    };

    const metaTag = await MetaTagModel.create({
      pageName,
      metaTitle,
      metaAuthor,
      metaKeywords,
      metaDescription,
      image: imagePath,
      canonicalTag,
      createdBy: req.user?._id,
    });

    const generatedSlug = await generateMetaSlug(slug);

    metaTag.slug = generatedSlug;
    await metaTag.save();

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: metaTag,
    });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong while creating meta tag");
  }
});

// --------------------- GET ALL META TAGS ---------------------
export const getMetaTags = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { pageName: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true" || status === true;
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const metaTags = await MetaTagModel.find(filters)
    .populate("createdBy updatedBy", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await MetaTagModel.countDocuments(filters);
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
    data: metaTags,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE META TAG ---------------------
export const getMetaTagById = asyncHandler(async (req, res) => {
  const metaTag = await MetaTagModel.findById(req.params.id)
    .populate("createdBy updatedBy", "name");

  if (!metaTag) {
    throw new ApiError(404, "Meta tag not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: metaTag,
  });
});

// --------------------- UPDATE META TAG ---------------------
export const updateMetaTag = asyncHandler(async (req, res) => {
  const {
    pageName,
    slug,
    metaTitle,
    metaAuthor,
    metaKeywords,
    metaDescription,
    status,
    canonicalTag,
  } = req.body;

  const metaTag = await MetaTagModel.findById(req.params.id);

  if (!metaTag) {
    throw new ApiError(404, "Meta tag not found");
  }

  if (req.files?.image?.[0]) {
    if (metaTag.image && fs.existsSync(path.join(process.cwd(), metaTag.image))) {
      fs.unlinkSync(path.join(process.cwd(), metaTag.image));
    };
    metaTag.image = await compressImage(req.files.image[0].buffer, "meta");
  };

  if (slug && slug !== metaTag.slug) {
    const newSlug = await generateMetaSlug(slug);
    metaTag.slug = newSlug;
  };

  metaTag.pageName = pageName || metaTag.pageName;
  metaTag.metaTitle = metaTitle || metaTag.metaTitle;
  metaTag.canonicalTag = canonicalTag || metaTag.canonicalTag;
  metaTag.metaAuthor = metaAuthor || metaTag.metaAuthor;
  metaTag.metaKeywords = metaKeywords || metaTag.metaKeywords;
  metaTag.metaDescription = metaDescription || metaTag.metaDescription;
  metaTag.status = typeof status === "boolean" ? status : metaTag.status;

  metaTag.updatedBy = req.user?._id;
  metaTag.updatedAt = new Date();

  await metaTag.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: metaTag,
  });
});

// --------------------- DELETE META TAG ---------------------
export const deleteMetaTag = asyncHandler(async (req, res) => {
  const metaTag = await MetaTagModel.findById(req.params.id);

  if (!metaTag) {
    throw new ApiError(404, "Meta tag not found");
  }

  if (metaTag.image && fs.existsSync(path.join(process.cwd(), metaTag.image))) {
    fs.unlinkSync(path.join(process.cwd(), metaTag.image));
  }

  await metaTag.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
