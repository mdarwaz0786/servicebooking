import HomePageServiceModel from "../../models/homePageService.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import SubSubCategoryModel from "../../models/subSubCategory.model.js";
import SubSubSubCategoryModel from "../../models/subSubSubCategory.model.js";
import ServiceModel from "../../models/service.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Create
export const createHomePageService = asyncHandler(async (req, res) => {
  const { services, title, category, subCategory } = req.body;
  const userId = req.user?._id;

  if (!title) throw new ApiError(400, "Title is required");

  const newService = await HomePageServiceModel.create({
    title,
    category,
    subCategory,
    services,
    createdBy: userId,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: newService });
});

// Get all
export const getHomePageServices = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 10, category, services, subCategory } = req.query;

  const filters = {};
  if (status !== undefined) filters.status = status === "true";
  if (search) filters.title = { $regex: search, $options: "i" };
  if (category) filters.category = category;
  if (subCategory) filters.subCategory = subCategory;
  if (services) filters.services = services;

  const skip = (page - 1) * limit;

  const service = await HomePageServiceModel.find(filters)
    .populate("services", "name image icon")
    .populate("category", "name image icon")
    .populate("subCategory", "name image icon")
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .lean();

  const total = await HomePageServiceModel.countDocuments(filters);
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
    data: service,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get single
export const getHomePageServiceById = asyncHandler(async (req, res) => {
  const service = await HomePageServiceModel
    .findById(req.params.id)
    .populate("services", "name image icon")
    .populate("category", "name image icon")
    .populate("subCategory", "name image icon")
    .lean();

  if (!service) throw new ApiError(404, "Home Page Service not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: service });
});

// Update
export const updateHomePageService = asyncHandler(async (req, res) => {
  const { services, category, subCategory, title, status } = req.body;
  const userId = req.user?._id;

  const service = await HomePageServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Home Page Service not found");

  if (services) service.services = services;
  service.category = category || service?.category;
  service.subCategory = subCategory || service?.subCategory;

  if (title) service.title = title;
  if (status !== undefined) service.status = status;
  service.updatedBy = userId;
  service.updatedAt = new Date();

  await service.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: service });
});

// Delete
export const deleteHomePageService = asyncHandler(async (req, res) => {
  const service = await HomePageServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Home Page Service not found");

  await service.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});

// Get all sub category
export const getSubCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, categoryId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;
  const filters = {};

  if (categoryId) {
    const categoryIds = Array.isArray(categoryId)
      ? categoryId
      : typeof categoryId === "string" && categoryId.includes(",")
        ? categoryId.split(",")
        : [categoryId];

    filters.categoryId = { $in: categoryIds };
  }

  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  let subCategories = await SubCategoryModel
    .find(filters)
    .populate("category createdBy updatedBy")
    .populate({
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
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  subCategories = subCategories.map((sub) => {
    const subSubCategoryCount = sub.subSubCategories?.length || 0;

    const subSubSubCategoryCount =
      sub.subSubCategories?.reduce((acc, subsub) => {
        return acc + (subsub.subSubSubCategories?.length || 0);
      }, 0) || 0;

    return {
      ...sub,
      subSubCategoryCount,
      subSubSubCategoryCount
    };
  });

  const total = await SubCategoryModel.countDocuments(filters);
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
    data: subCategories,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get all sub sub category
export const getSubSubCategories = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page,
    limit,
    categoryId,
    subCategoryId
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (subCategoryId) {
    const subCategoryIds = Array.isArray(subCategoryId)
      ? subCategoryId
      : typeof subCategoryId === "string" && subCategoryId.includes(",")
        ? subCategoryId.split(",")
        : [subCategoryId];

    filters.subCategoryId = { $in: subCategoryIds };
  }

  if (categoryId) {
    const categoryIds = Array.isArray(categoryId)
      ? categoryId
      : typeof categoryId === "string" && categoryId.includes(",")
        ? categoryId.split(",")
        : [categoryId];

    filters.categoryId = { $in: categoryIds };
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  let subSubCategories = await SubSubCategoryModel
    .find(filters)
    .populate("category subCategory createdBy updatedBy")
    .populate({
      path: "subSubSubCategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  subSubCategories = subSubCategories.map((subsub) => {
    const subSubSubCategoryCount =
      subsub.subSubSubCategories?.length || 0;

    return {
      ...subsub,
      subSubSubCategoryCount,
    };
  });

  const total = await SubSubCategoryModel.countDocuments(filters);
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
    data: subSubCategories,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get all sub sub sub category
export const getSubSubSubCategories = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page,
    limit,
    categoryId,
    subCategoryId,
    subSubCategoryId
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (categoryId) {
    const categoryIds = Array.isArray(categoryId)
      ? categoryId
      : typeof categoryId === "string" && categoryId.includes(",")
        ? categoryId.split(",")
        : [categoryId];

    filters.categoryId = { $in: categoryIds };
  }

  if (subCategoryId) {
    const subCategoryIds = Array.isArray(subCategoryId)
      ? subCategoryId
      : typeof subCategoryId === "string" && subCategoryId.includes(",")
        ? subCategoryId.split(",")
        : [subCategoryId];

    filters.subCategoryId = { $in: subCategoryIds };
  }

  if (subSubCategoryId) {
    const subSubCategoryIds = Array.isArray(subSubCategoryId)
      ? subSubCategoryId
      : typeof subSubCategoryId === "string" && subSubCategoryId.includes(",")
        ? subSubCategoryId.split(",")
        : [subSubCategoryId];

    filters.subSubCategoryId = { $in: subSubCategoryIds };
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const categories = await SubSubSubCategoryModel
    .find(filters)
    .populate("category subCategory subSubCategory createdBy updatedBy")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await SubSubSubCategoryModel.countDocuments(filters);
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

// Get all services
export const getServices = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page,
    limit,
    categoryId,
    subCategoryId,
    subSubCategoryId,
    subSubSubCategoryId
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (categoryId) {
    const categoryIds = Array.isArray(categoryId)
      ? categoryId
      : typeof categoryId === "string" && categoryId.includes(",")
        ? categoryId.split(",")
        : [categoryId];

    filters.categoryId = { $in: categoryIds };
  }

  if (subCategoryId) {
    const subCategoryIds = Array.isArray(subCategoryId)
      ? subCategoryId
      : typeof subCategoryId === "string" && subCategoryId.includes(",")
        ? subCategoryId.split(",")
        : [subCategoryId];

    filters.subCategoryId = { $in: subCategoryIds };
  }

  if (subSubCategoryId) {
    const subSubCategoryIds = Array.isArray(subSubCategoryId)
      ? subSubCategoryId
      : typeof subSubCategoryId === "string" && subSubCategoryId.includes(",")
        ? subSubCategoryId.split(",")
        : [subSubCategoryId];

    filters.subSubCategoryId = { $in: subSubCategoryIds };
  }

  if (subSubSubCategoryId) {
    const subSubSubCategoryIds = Array.isArray(subSubSubCategoryId)
      ? subSubSubCategoryId
      : typeof subSubSubCategoryId === "string" && subSubSubCategoryId.includes(",")
        ? subSubSubCategoryId.split(",")
        : [subSubSubCategoryId];

    filters.subSubSubCategoryId = { $in: subSubSubCategoryIds };
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const services = await ServiceModel
    .find(filters)
    .populate("category", "name")
    .populate("subCategory", "name")
    .populate("subSubCategory", "name")
    .populate("subSubSubCategory", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ServiceModel.countDocuments(filters);
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
    data: services,
    pagination: buildPagination({ page, limit, total }),
  });
});




