import ServiceModel from "../../models/service.model.js";
import SlugModel from "../../models/slug.model.js";
import MetaTagModel from "../../models/metaTag.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create service
export const createService = asyncHandler(async (req, res) => {
  const {
    name,
    warrantyDays,
    rating,
    review,
    mrpPrice,
    salePrice,
    taxablePrice,
    isMediaUpload,
    timeTaking,
    shortDescription,
    fullDescription,
    categoryId,
    subCategoryId,
    subSubCategoryId,
    subSubSubCategoryId,
    repairingDiagnostic,
    offerContent,
    maxBookingQuantity,
    taxPercent,
    creditPoint,
    transactionCharge,
    canonicalTag,
    slug,
    pageName,
    metaTitle,
    metaAuthor,
    metaKeywords,
    metaDescription,
  } = req.body;

  if (!name || !name.trim()) throw new ApiError(400, "Service name is required");
  if (!categoryId) throw new ApiError(400, "Category is required");

  let imagePath = null;
  let iconPath = null;
  let popupImagePath = null;
  let metaImagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "service");
    };

    if (req.files?.icon?.[0]) {
      iconPath = await compressImage(req.files.icon[0].buffer, "service");
    };

    if (req.files?.popupImage?.[0]) {
      popupImagePath = await compressImage(req.files.popupImage[0].buffer, "service");
    };

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    };

    const service = await ServiceModel.create({
      name,
      warrantyDays,
      rating,
      review,
      mrpPrice,
      salePrice,
      taxablePrice,
      timeTaking,
      isMediaUpload,
      shortDescription,
      fullDescription,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      subSubSubCategoryId,
      createdBy: req.user?._id,
      image: imagePath,
      icon: iconPath,
      popupImage: popupImagePath,
      repairingDiagnostic,
      offerContent,
      maxBookingQuantity,
      taxPercent,
      creditPoint,
      transactionCharge,
    });

    const s = await generateUniqueSlug(name, "Service", service?._id, "services");
    service.slug = s;
    await service.save();

    const metaTag = await MetaTagModel.create({
      pageName: pageName || "service",
      metaTitle: metaTitle || name,
      metaDescription,
      metaKeywords,
      metaAuthor,
      image: metaImagePath,
      slug: s,
      canonicalTag,
      createdBy: req.user?._id,
    });

    await metaTag.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: service });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    if (iconPath && fs.existsSync(path.join(process.cwd(), iconPath))) {
      fs.unlinkSync(path.join(process.cwd(), iconPath));
    };
    if (popupImagePath && fs.existsSync(path.join(process.cwd(), popupImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), popupImagePath));
    };
    if (metaImagePath && fs.existsSync(path.join(process.cwd(), metaImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), metaImagePath));
    };
    if (error.code === 11000) {
      throw new ApiError(409, "Service already exists");
    }
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// Get all services
export const getServices = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, categoryId, subCategoryId, subSubCategoryId, subSubSubCategoryId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  if (status !== undefined) filters.status = status === "true";

  if (categoryId) {
    filters.categoryId = categoryId;
  };

  if (subCategoryId) {
    filters.subCategoryId = subCategoryId;
  };

  if (subSubCategoryId) {
    filters.subSubCategoryId = subSubCategoryId;
  };

  if (subSubSubCategoryId) {
    filters.subSubSubCategoryId = subSubSubCategoryId;
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  const services = await ServiceModel
    .find(filters)
    .populate("category", "name")
    .populate("subCategory", "name")
    .populate("subSubCategory", "name")
    .populate("subSubSubCategory", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

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

// Get single service
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await ServiceModel
    .findById(req.params.id)
    .populate("category", "image name")
    .populate("subCategory", "image name")
    .populate("subSubCategory", "image name")
    .populate("subSubSubCategory", "image name")
    .lean();

  if (!service) throw new ApiError(404, "Service not found");

  const metaTag = await MetaTagModel.findOne({ slug: service?.slug });

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: service, meta: metaTag });
});

// Update service
export const updateService = asyncHandler(async (req, res) => {
  const {
    name,
    warrantyDays,
    rating,
    review,
    mrpPrice,
    salePrice,
    taxablePrice,
    timeTaking,
    shortDescription,
    fullDescription,
    status,
    isMediaUpload,
    categoryId,
    subCategoryId,
    subSubCategoryId,
    subSubSubCategoryId,
    repairingDiagnostic,
    offerContent,
    maxBookingQuantity,
    taxPercent,
    creditPoint,
    transactionCharge,
    pageName,
    metaTitle,
    metaAuthor,
    metaKeywords,
    metaDescription,
    canonicalTag,
    slug,
  } = req.body;

  const service = await ServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");

  const metaTag = await MetaTagModel.findOne({ slug: service?.slug });

  if (req.files?.image?.[0]) {
    if (service.image && fs.existsSync(path.join(process.cwd(), service.image))) {
      fs.unlinkSync(path.join(process.cwd(), service.image));
    };
    service.image = await compressImage(req.files.image[0].buffer, "service");
  };

  if (req.files?.icon?.[0]) {
    if (service.icon && fs.existsSync(path.join(process.cwd(), service.icon))) {
      fs.unlinkSync(path.join(process.cwd(), service.icon));
    };
    service.icon = await compressImage(req.files.icon[0].buffer, "service");
  };

  if (req.files?.popupImage?.[0]) {
    if (service.popupImage && fs.existsSync(path.join(process.cwd(), service.popupImage))) {
      fs.unlinkSync(path.join(process.cwd(), service.popupImage));
    };
    service.popupImage = await compressImage(req.files.popupImage[0].buffer, "service");
  };

  let newSlug = null;
  if (name && name !== service.name) {
    await SlugModel.deleteOne({ collectionName: "Service", documentId: service?._id });
    newSlug = await generateUniqueSlug(name, "Service", service._id, "services");
  };

  service.name = name || service.name;
  service.warrantyDays = warrantyDays || service.warrantyDays;
  service.rating = rating || service.rating;
  service.review = review || service.review;
  service.isMediaUpload = isMediaUpload || service.isMediaUpload;
  service.mrpPrice = mrpPrice !== undefined ? mrpPrice : service.mrpPrice;
  service.salePrice = salePrice !== undefined ? salePrice : service.salePrice;
  service.timeTaking = timeTaking || service.timeTaking;
  if (shortDescription !== undefined) service.shortDescription = shortDescription;
  if (fullDescription !== undefined) service.fullDescription = fullDescription;
  service.status = typeof status === "boolean" ? status : service.status;
  service.categoryId = categoryId || service.categoryId;
  service.subCategoryId = subCategoryId || service.subCategoryId;
  service.subSubCategoryId = subSubCategoryId || service.subSubCategoryId;
  service.subSubSubCategoryId = subSubSubCategoryId || service.subSubSubCategoryId;
  service.repairingDiagnostic = repairingDiagnostic || service.repairingDiagnostic;
  service.offerContent = offerContent || service.offerContent;
  service.maxBookingQuantity = maxBookingQuantity !== undefined ? maxBookingQuantity : service.maxBookingQuantity;
  service.taxPercent = taxPercent !== undefined ? taxPercent : service.taxPercent;
  service.creditPoint = creditPoint !== undefined ? creditPoint : service.creditPoint;
  service.transactionCharge = transactionCharge !== undefined ? transactionCharge : service.transactionCharge;
  service.taxablePrice = taxablePrice !== undefined ? taxablePrice : service.taxablePrice;

  if (slug) {
    service.slug = slug;
  } else if (newSlug) {
    service.slug = newSlug;
  } else {
    service.slug = service?.slug;
  };

  service.updatedBy = req.user?._id;
  service.updatedAt = Date.now();

  await service.save();

  if (metaTag) {
    if (req.files?.metaImage?.[0]) {
      if (metaTag?.image && fs.existsSync(path.join(process.cwd(), metaTag?.image))) {
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
      pageName: pageName || "service",
      metaTitle: metaTitle || name || service?.name,
      metaDescription,
      metaKeywords,
      metaAuthor,
      canonicalTag,
      image: metaImagePath,
      slug: slug || newSlug || service?.slug,
      createdBy: req.user?._id,
    });
  };

  return res.status(200).json({ success: true, message: "Updated successfully", data: service });
});

// Delete service
export const deleteService = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");

  const metaTag = await MetaTagModel.findOne({ slug: service?.slug });

  if (service?.image && fs.existsSync(path.join(process.cwd(), service?.image))) {
    fs.unlinkSync(path.join(process.cwd(), service?.image));
  };

  if (service?.icon && fs.existsSync(path.join(process.cwd(), service?.icon))) {
    fs.unlinkSync(path.join(process.cwd(), service?.icon));
  };

  if (service?.popupImage && fs.existsSync(path.join(process.cwd(), service?.popupImage))) {
    fs.unlinkSync(path.join(process.cwd(), service?.popupImage));
  };

  await SlugModel.deleteOne({ collectionName: "Service", documentId: service?._id });
  await service.deleteOne();

  if (metaTag) {
    if (metaTag.image && fs.existsSync(path.join(process.cwd(), metaTag.image))) {
      fs.unlinkSync(path.join(process.cwd(), metaTag.image));
    };
    await metaTag.deleteOne();
  };

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
