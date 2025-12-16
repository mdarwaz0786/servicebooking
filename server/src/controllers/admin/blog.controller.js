import BlogModel from "../../models/blog.model.js";
import SlugModel from "../../models/slug.model.js";
import MetaTagModel from "../../models/metaTag.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE BLOG ---------------------
export const createBlog = asyncHandler(async (req, res) => {
  const { category, title, shortDescription, fullDescription, status, frontImageAlt, detailImageAlt, pageName, metaTitle, metaAuthor, metaKeywords, metaDescription } = req.body;

  if (!title) {
    throw new ApiError(400, "Blog title is required");
  }

  if (!category) {
    throw new ApiError(400, "Blog category is required");
  }

  let frontImagePath = null;
  let detailImagePath = null;
  let metaImagePath = null;

  try {
    if (req.files?.frontImage?.[0]) {
      frontImagePath = await compressImage(req.files.frontImage[0].buffer, "blog");
    }

    if (req.files?.detailImage?.[0]) {
      detailImagePath = await compressImage(req.files.detailImage[0].buffer, "blog");
    }

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    };

    const blog = await BlogModel.create({
      category,
      title,
      shortDescription,
      fullDescription,
      frontImage: frontImagePath,
      detailImage: detailImagePath,
      status,
      frontImageAlt,
      detailImageAlt,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = slug;
    await blog.save();

    const metaTag = await MetaTagModel.create({
      pageName,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaAuthor,
      image: metaImagePath,
      slug,
      createdBy: req.user?._id,
    });

    await metaTag.save();

    return res.status(201).json({ success: true, message: "Created Successfully", data: { blog, metaTag } });
  } catch (error) {
    if (frontImagePath && fs.existsSync(path.join(process.cwd(), frontImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), frontImagePath));
    }
    if (detailImagePath && fs.existsSync(path.join(process.cwd(), detailImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), detailImagePath));
    }
    if (metaImagePath && fs.existsSync(path.join(process.cwd(), metaImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), metaImagePath));
    };
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

  const metaTag = await MetaTagModel.findOne({ slug: blog?.slug });

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: blog, meta: metaTag });
});

// --------------------- UPDATE BLOG ---------------------
export const updateBlog = asyncHandler(async (req, res) => {
  const { category, title, shortDescription, fullDescription, status, frontImageAlt, detailImageAlt, pageName, metaTitle, metaAuthor, metaKeywords, metaDescription } = req.body;

  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const metaTag = await MetaTagModel.findOne({ slug: blog?.slug });

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

  let newSlug = null;
  if (title && title !== blog?.title) {
    await SlugModel.deleteOne({
      collectionName: "Blog",
      documentId: blog._id,
    });

    newSlug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = newSlug;
  }

  blog.title = title || blog.title;
  blog.frontImageAlt = frontImageAlt || blog.frontImageAlt;
  blog.detailImageAlt = detailImageAlt || blog.detailImageAlt;
  blog.category = category || blog.category;
  blog.shortDescription = shortDescription || blog.shortDescription;
  blog.fullDescription = fullDescription || blog.fullDescription;
  blog.status = typeof status === "boolean" ? status : blog.status;
  blog.updatedBy = req.user?._id;

  await blog.save();

  if (metaTag) {
    if (req.files?.metaImage?.[0]) {
      if (metaTag.image && fs.existsSync(path.join(process.cwd(), metaTag.image))) {
        fs.unlinkSync(path.join(process.cwd(), metaTag.image));
      };
      metaTag.image = await compressImage(req.files.metaImage[0].buffer, "meta");
    };

    metaTag.pageName = pageName || metaTag.pageName;
    metaTag.metaTitle = metaTitle || metaTag.metaTitle;
    metaTag.metaDescription = metaDescription || metaTag.metaDescription;
    metaTag.metaKeywords = metaKeywords || metaTag.metaKeywords;
    metaTag.metaAuthor = metaAuthor || metaTag.metaAuthor;
    newSlug ? metaTag.slug = newSlug : metaTag.slug = metaTag.slug;
    metaTag.updatedBy = req.user?._id;

    await metaTag.save();
  } else {
    let metaImagePath = null;
    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    }

    await MetaTagModel.create({
      pageName,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaAuthor,
      image: metaImagePath,
      slug: newSlug || blog?.slug,
      createdBy: req.user?._id,
    });
  }

  return res.status(200).json({ success: true, message: "Updated Successfully", data: blog });
});

// --------------------- DELETE BLOG ---------------------
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const metaTag = await MetaTagModel.findOne({ slug: blog?.slug });

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

  if (metaTag) {
    if (metaTag.image && fs.existsSync(path.join(process.cwd(), metaTag.image))) {
      fs.unlinkSync(path.join(process.cwd(), metaTag.image));
    };
    await metaTag.deleteOne();
  };

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
