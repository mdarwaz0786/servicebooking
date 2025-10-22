import BlogModel from "../../models/blog.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE BLOG ---------------------
export const createBlog = asyncHandler(async (req, res) => {
  const { category, title, shortDescription, fullDescription, status } = req.body;

  if (!title) {
    throw new ApiError(400, "Blog title is required");
  }

  if (!category) {
    throw new ApiError(400, "Blog category is required");
  }

  let frontImagePath = null;
  let detailImagePath = null;

  try {
    if (req.files?.frontImage?.[0]) {
      frontImagePath = await compressImage(req.files.frontImage[0].buffer, "blog");
    }

    if (req.files?.detailImage?.[0]) {
      detailImagePath = await compressImage(req.files.detailImage[0].buffer, "blog");
    }

    const blog = await BlogModel.create({
      category,
      title,
      shortDescription,
      fullDescription,
      frontImage: frontImagePath,
      detailImage: detailImagePath,
      status,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = slug;
    await blog.save();

    return res.status(201).json({ success: true, message: "Created Successfully", data: blog });
  } catch (error) {
    if (frontImagePath && fs.existsSync(path.join(process.cwd(), frontImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), frontImagePath));
    }
    if (detailImagePath && fs.existsSync(path.join(process.cwd(), detailImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), detailImagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong while creating blog");
  }
});

// --------------------- GET ALL BLOGS ---------------------
export const getBlogs = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10, category } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [{ title: { $regex: search, $options: "i" } }];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (category) {
    filters.category = category;
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const blogs = await BlogModel
    .find(filters)
    .populate("category", "name")
    .populate("createdBy updatedBy", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BlogModel.countDocuments(filters);
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
    data: blogs,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE BLOG ---------------------
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await BlogModel
    .findById(req.params.id)
    .populate("category", "name")
    .populate("createdBy updatedBy", "name");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: blog });
});

// --------------------- UPDATE BLOG ---------------------
export const updateBlog = asyncHandler(async (req, res) => {
  const { category, title, shortDescription, fullDescription, status } = req.body;

  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (req.files?.frontImage?.[0]) {
    if (blog.frontImage && fs.existsSync(path.join(process.cwd(), blog.frontImage))) {
      fs.unlinkSync(path.join(process.cwd(), blog.frontImage));
    }
    blog.frontImage = await compressImage(req.files.frontImage[0].buffer, "blog");
  }

  if (req.files?.detailImage?.[0]) {
    if (blog.detailImage && fs.existsSync(path.join(process.cwd(), blog.detailImage))) {
      fs.unlinkSync(path.join(process.cwd(), blog.detailImage));
    }
    blog.detailImage = await compressImage(req.files.detailImage[0].buffer, "blog");
  }

  if (title && title !== blog?.title) {
    await SlugModel.deleteOne({
      collectionName: "Blog",
      documentId: blog._id,
    });

    const newSlug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = newSlug;
  }

  blog.title = title || blog.title;
  blog.category = category || blog.category;
  blog.shortDescription = shortDescription || blog.shortDescription;
  blog.fullDescription = fullDescription || blog.fullDescription;
  blog.status = typeof status === "boolean" ? status : blog.status;
  blog.updatedBy = req.user?._id;

  await blog.save();

  return res.status(200).json({ success: true, data: blog });
});

// --------------------- DELETE BLOG ---------------------
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.frontImage && fs.existsSync(path.join(process.cwd(), blog.frontImage))) {
    fs.unlinkSync(path.join(process.cwd(), blog.frontImage));
  }

  if (blog.detailImage && fs.existsSync(path.join(process.cwd(), blog.detailImage))) {
    fs.unlinkSync(path.join(process.cwd(), blog.detailImage));
  }

  await SlugModel.deleteOne({
    collectionName: "Blog",
    documentId: blog?._id,
  });

  await blog.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
