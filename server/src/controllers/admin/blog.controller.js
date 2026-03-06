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
import compressVideo from "../../helpers/compressVideo.js";

// --------------------- CREATE BLOG ---------------------
export const createBlog = asyncHandler(async (req, res) => {
  const {
    category,
    title,
    tags,
    shortDescription,
    fullDescription,
    frontImageAlt,
    detailImageAlt,
    isComment,
    canonicalTag,
    publishDate,
    publishTime,
    publishStatus,
    author,
    lat,
    long,
    city,
    state,
    country,
    zipCode,
    address,
    pageName,
    metaTitle,
    metaAuthor,
    metaKeywords,
    metaDescription
  } = req.body;

  if (!title) {
    throw new ApiError(400, "Blog title is required");
  };

  if (!category) {
    throw new ApiError(400, "Blog category is required");
  };

  let frontImagePath = null;
  let detailImagePath = null;
  let metaImagePath = null;
  let videoPath = null;

  try {
    if (req.files?.frontImage?.[0]) {
      frontImagePath = await compressImage(req.files.frontImage[0].buffer, "blog");
    };

    if (req.files?.detailImage?.[0]) {
      detailImagePath = await compressImage(req.files.detailImage[0].buffer, "blog");
    };

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    };

    if (req.files?.video?.[0]) {
      videoPath = await compressVideo(req.files.video[0].buffer, "video");
    };

    const blog = await BlogModel.create({
      category,
      title,
      shortDescription,
      fullDescription,
      frontImage: frontImagePath,
      detailImage: detailImagePath,
      isComment,
      video: videoPath,
      canonicalTag,
      frontImageAlt,
      detailImageAlt,
      publishStatus,
      publishDate,
      publishTime,
      author,
      lat,
      long,
      city,
      state,
      country,
      zipCode,
      address,
      tags,
      meta: {
        title: metaTitle || title,
        keywords: metaKeywords,
        image: metaImagePath,
        author: metaAuthor,
        description: metaDescription,
        canonicalTag,
      },
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = slug;
    blog.meta.slug = slug;
    await blog.save();

    const metaTag = await MetaTagModel.create({
      pageName: pageName || "blog",
      metaTitle: metaTitle || title,
      metaDescription,
      metaKeywords,
      metaAuthor,
      image: metaImagePath,
      slug,
      createdBy: req.user?._id,
      canonicalTag,
      tags,
      lat,
      long,
      city,
      state,
      country,
      zipCode,
      address,
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
    if (videoPath && fs.existsSync(path.join(process.cwd(), videoPath))) {
      fs.unlinkSync(path.join(process.cwd(), videoPath));
    };
    throw new ApiError(500, error.message || "Something went wrong while creating blog");
  };
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
  const {
    category,
    title,
    slug,
    shortDescription,
    fullDescription,
    frontImageAlt,
    detailImageAlt,
    isComment,
    tags,
    video,
    canonicalTag,
    publishDate,
    publishTime,
    publishStatus,
    author,
    lat,
    long,
    city,
    state,
    country,
    zipCode,
    address,
    pageName,
    metaTitle,
    metaAuthor,
    metaKeywords,
    metaDescription
  } = req.body;

  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const metaTag = await MetaTagModel.findOne({ slug: blog?.slug });

  // ---------------- IMAGE UPDATE ----------------
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

  // ---------------- VIDEO UPDATE ----------------
  if (req.files?.video?.[0]) {
    if (blog.video && fs.existsSync(path.join(process.cwd(), blog.video))) {
      fs.unlinkSync(path.join(process.cwd(), blog.video));
    }

    blog.video = await compressVideo(req.files.video[0].buffer, "video");
  }

  // ---------------- SLUG UPDATE ----------------
  let newSlug = null;

  if (!slug && title && title !== blog.title) {
    await SlugModel.deleteOne({
      collectionName: "Blog",
      documentId: blog._id,
    });

    newSlug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = newSlug;
  }
  else if (slug && slug !== blog.slug) {
    const existingSlug = await SlugModel.findOne({ slug, collectionName: "Blog" });
    if (existingSlug) {
      throw new ApiError(400, "Slug already exists. Please choose a different slug.");
    } else {
      await SlugModel.deleteOne({
        collectionName: "Blog",
        documentId: blog._id,
      });
      newSlug = slug;
      blog.slug = newSlug;
    }
  }

  // ---------------- BLOG UPDATE ----------------
  blog.title = title || blog.title;
  blog.category = category || blog.category;
  blog.tags = tags || blog.tags;
  blog.shortDescription = shortDescription || blog.shortDescription;
  blog.fullDescription = fullDescription || blog.fullDescription;
  blog.frontImageAlt = frontImageAlt || blog.frontImageAlt;
  blog.detailImageAlt = detailImageAlt || blog.detailImageAlt;

  blog.isComment = isComment || blog.isComment;
  blog.video = video || blog.video;
  blog.canonicalTag = canonicalTag || blog.canonicalTag;
  blog.publishDate = publishDate || blog.publishDate;
  blog.publishTime = publishTime || blog.publishTime;
  blog.publishStatus = publishStatus || blog.publishStatus;
  blog.author = author || blog.author;

  blog.lat = lat || blog.lat;
  blog.long = long || blog.long;
  blog.city = city || blog.city;
  blog.state = state || blog.state;
  blog.country = country || blog.country;
  blog.zipCode = zipCode || blog.zipCode;
  blog.address = address || blog.address;

  // update meta inside blog
  if (!blog.meta) blog.meta = {};
  blog.meta.title = metaTitle || blog.meta.title || blog.title;
  blog.meta.keywords = metaKeywords || blog.meta.keywords;
  blog.meta.author = metaAuthor || blog.meta.author;
  blog.meta.description = metaDescription || blog.meta.description;
  blog.meta.canonicalTag = canonicalTag || blog.meta.canonicalTag;
  blog.meta.slug = newSlug || blog.meta.slug;
  blog.updatedBy = req.user?._id;
  blog.updatedAt = new Date();

  await blog.save();

  // ---------------- META TAG UPDATE ----------------
  if (metaTag) {
    if (req.files?.metaImage?.[0]) {
      if (metaTag.image && fs.existsSync(path.join(process.cwd(), metaTag.image))) {
        fs.unlinkSync(path.join(process.cwd(), metaTag.image));
      }

      metaTag.image = await compressImage(req.files.metaImage[0].buffer, "meta");
    }

    metaTag.pageName = pageName || metaTag.pageName;
    metaTag.metaTitle = metaTitle || metaTag.metaTitle;
    metaTag.metaDescription = metaDescription || metaTag.metaDescription;
    metaTag.metaKeywords = metaKeywords || metaTag.metaKeywords;
    metaTag.metaAuthor = metaAuthor || metaTag.metaAuthor;
    metaTag.canonicalTag = canonicalTag || metaTag.canonicalTag;
    metaTag.tags = tags || metaTag.tags;
    metaTag.lat = lat || metaTag.lat;
    metaTag.long = long || metaTag.long;
    metaTag.city = city || metaTag.city;
    metaTag.state = state || metaTag.state;
    metaTag.country = country || metaTag.country;
    metaTag.zipCode = zipCode || metaTag.zipCode;
    metaTag.address = address || metaTag.address;
    if (newSlug) metaTag.slug = newSlug;
    metaTag.updatedBy = req.user?._id;
    metaTag.updatedAt = new Date();

    await metaTag.save();
  } else {

    let metaImagePath = null;

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    }

    await MetaTagModel.create({
      pageName: pageName || "blog",
      metaTitle: metaTitle || title || blog?.title,
      metaDescription,
      metaKeywords,
      metaAuthor,
      image: metaImagePath,
      slug: newSlug || blog?.slug,
      canonicalTag,
      tags,
      lat,
      long,
      city,
      state,
      country,
      zipCode,
      address,
      createdBy: req.user?._id,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Updated Successfully",
    data: blog,
  });
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

  if (blog.video && fs.existsSync(path.join(process.cwd(), blog.video))) {
    fs.unlinkSync(path.join(process.cwd(), blog.video));
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

  await metaTag.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
