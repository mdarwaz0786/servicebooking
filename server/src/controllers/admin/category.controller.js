import CategoryModel from "../../models/category.model.js";
import SlugModel from "../../models/slug.model.js";
import MetaTagModel from "../../models/metaTag.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create Category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, pageName, metaTitle, metaAuthor, metaKeywords, metaDescription, canonicalTag, slug } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Category name is required");
  };

  let imagePath = null;
  let metaImagePath = null;
  let iconPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "category");
    };

    if (req.files?.icon?.[0]) {
      iconPath = await compressImage(req.files.icon[0].buffer, "category");
    };

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    };

    const category = await CategoryModel.create({
      name,
      shortDescription,
      fullDescription,
      createdBy: req.user?._id,
      image: imagePath,
      icon: iconPath,
    });

    const s = await generateUniqueSlug(name, "Category", category._id, "categories");

    category.slug = s;
    await category.save();

    const metaTag = await MetaTagModel.create({
      pageName: pageName || "product",
      metaTitle: metaTitle || name,
      metaDescription,
      metaKeywords,
      metaAuthor,
      image: metaImagePath,
      slug: slug || category?.slug,
      canonicalTag,
      createdBy: req.user?._id,
    });

    await metaTag.save();

    return res.status(201).json({ success: true, data: { category, metaTag } });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    if (metaImagePath && fs.existsSync(path.join(process.cwd(), metaImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), metaImagePath));
    };
    if (iconPath && fs.existsSync(path.join(process.cwd(), iconPath))) {
      fs.unlinkSync(path.join(process.cwd(), iconPath));
    };
    if (error.code === 11000) {
      throw new ApiError(409, "Product already exists");
    }
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get All Categories
export const getCategories = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page,
    limit,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
    ];
  };

  if (status !== undefined) {
    filters.status = status === "true";
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  let categories = await CategoryModel
    .find(filters)
    .populate("createdBy updatedBy")
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      populate: {
        path: "subSubCategories",
        match: { status: true },
        options: { sort: { createdAt: -1 } },
        strictPopulate: false,
        populate: {
          path: "subSubSubCategories",
          match: { status: true },
          options: { sort: { createdAt: -1 } },
          strictPopulate: false,
        }
      }
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  categories = categories.map((cat) => {
    const subCategoryCount = cat.subcategories?.length || 0;

    const subSubCategoryCount = cat.subcategories?.reduce((acc, sub) => {
      return acc + (sub.subSubCategories?.length || 0);
    }, 0) || 0;

    const subSubSubCategoryCount = cat.subcategories?.reduce((acc1, sub) => {
      return acc1 + (sub.subSubCategories?.reduce((acc2, subsub) => {
        return acc2 + (subsub.subSubSubCategories?.length || 0);
      }, 0));
    }, 0) || 0;

    return {
      ...cat,
      subCategoryCount,
      subSubCategoryCount,
      subSubSubCategoryCount
    };
  });

  const total = await CategoryModel.countDocuments(filters);
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
    data: categories,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single Category
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoryModel
    .findById(req.params.id)
    .populate("createdBy updatedBy")
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      populate: {
        path: "subSubCategories",
        match: { status: true },
        options: { sort: { createdAt: -1 } },
        strictPopulate: false,
        populate: {
          path: "subSubSubCategories",
          match: { status: true },
          options: { sort: { createdAt: -1 } },
          strictPopulate: false,
        }
      }
    });

  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  const metaTag = await MetaTagModel.findOne({ slug: category?.slug });

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: category, meta: metaTag });
});

//  Update Category
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, shortDescription, fullDescription, status, pageName, metaTitle, metaAuthor, metaKeywords, metaDescription, canonicalTag, slug } = req.body;

  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  const metaTag = await MetaTagModel.findOne({ slug: category?.slug });

  if (req.files?.image?.[0]) {
    if (category.image && fs.existsSync(path.join(process.cwd(), category.image))) {
      fs.unlinkSync(path.join(process.cwd(), category.image));
    };
    category.image = await compressImage(req.files.image[0].buffer, "category");
  };

  if (req.files?.icon?.[0]) {
    if (category.icon && fs.existsSync(path.join(process.cwd(), category.icon))) {
      fs.unlinkSync(path.join(process.cwd(), category.icon));
    };
    category.icon = await compressImage(req.files.icon[0].buffer, "category");
  };

  let newSlug = null;
  if (name && name !== category.name) {
    await SlugModel.deleteOne({
      collectionName: "Category",
      documentId: category?._id,
    });

    newSlug = await generateUniqueSlug(name, "Category", category?._id, "categories");
    category.slug = newSlug;
  };

  category.name = name || category.name;
  category.shortDescription = shortDescription || category.shortDescription;
  category.fullDescription = fullDescription || category.fullDescription;
  category.status = typeof status === "boolean" ? status : category.status;
  if (slug) {
    category.slug = slug;
  } else if (newSlug) {
    category.slug = newSlug;
  } else {
    category.slug = category?.slug;
  };
  category.updatedBy = req.user?._id;
  category.updatedAt = Date.now();

  await category.save();

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
    metaTag.canonicalTag = canonicalTag || metaTag.canonicalTag;
    if (slug) {
      metaTag.slug = slug;
    } else if (newSlug) {
      metaTag.slug = newSlug;
    } else {
      metaTag.slug = metaTag?.slug;
    };
    metaTag.updatedBy = req.user?._id;
    metaTag.updatedAt = Date.now();

    await metaTag.save();

  } else {
    let metaImagePath = null;
    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    };

    await MetaTagModel.create({
      pageName: pageName || "product",
      metaTitle: metaTitle || name || category.name,
      metaDescription,
      metaKeywords,
      metaAuthor,
      canonicalTag,
      image: metaImagePath,
      slug: slug || newSlug || category?.slug,
      createdBy: req.user?._id,
    });
  };

  return res.status(200).json({ success: true, message: "Updated successfully", data: { category, metaTag } });
});

//  Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  };

  const metaTag = await MetaTagModel.findOne({ slug: category?.slug });

  if (category.image && fs.existsSync(path.join(process.cwd(), category.image))) {
    fs.unlinkSync(path.join(process.cwd(), category.image));
  };

  if (category.icon && fs.existsSync(path.join(process.cwd(), category.icon))) {
    fs.unlinkSync(path.join(process.cwd(), category.icon));
  };

  await SlugModel.deleteOne({
    collectionName: "Category",
    documentId: category?._id,
  });

  await category.deleteOne();

  if (metaTag) {
    if (metaTag.image && fs.existsSync(path.join(process.cwd(), metaTag.image))) {
      fs.unlinkSync(path.join(process.cwd(), metaTag.image));
    };
    await metaTag.deleteOne();
  };

  return res.status(200).json({ success: true, message: "Category deleted successfully" });
});
