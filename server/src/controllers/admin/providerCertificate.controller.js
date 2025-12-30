import ProviderCertificateModel from "../../models/providerCertificate.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import { buildPagination } from "../../utils/pagination.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";

export const createProviderCertificate = asyncHandler(async (req, res) => {
  const {
    providerId,
    title,
    number,
    issuedFrom,
    issueDate,
    expiryDate,
    description
  } = req.body;

  if (!providerId) throw new ApiError(400, "Provider is required");
  if (!title?.trim()) throw new ApiError(400, "Title is required");
  if (!number?.trim()) throw new ApiError(400, "Certificate number is required");
  if (!issuedFrom?.trim()) throw new ApiError(400, "Issued from is required");
  if (!issueDate) throw new ApiError(400, "Issue date is required");
  if (!expiryDate) throw new ApiError(400, "Expiry date is required");

  let imagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "certificate");
    };

    let certificate = await ProviderCertificateModel.create({
      providerId,
      title,
      number,
      issuedFrom,
      issueDate,
      expiryDate,
      description,
      image: imagePath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(
      title,
      "ProviderCertificate",
      certificate?._id,
      "provider-certificates"
    );

    certificate.slug = slug;
    await certificate.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: certificate });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getProviderCertificates = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit, serviceman } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { number: { $regex: search, $options: "i" } }
    ];
  };

  if (serviceman) {
    filters.providerId = serviceman;
  };

  let sortOption = {};
  sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const certificates = await ProviderCertificateModel.find(filters)
    .populate("providerId")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ProviderCertificateModel.countDocuments(filters);
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
    data: certificates,
    pagination: buildPagination({ page, limit, total })
  });
});

export const getProviderCertificateById = asyncHandler(async (req, res) => {
  const certificate = await ProviderCertificateModel.findById(req.params.id).populate("providerId");

  if (!certificate) throw new ApiError(404, "Certificate not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: certificate });
});

export const updateProviderCertificate = asyncHandler(async (req, res) => {
  const {
    providerId,
    title,
    number,
    issuedFrom,
    issueDate,
    expiryDate,
    description,
    status
  } = req.body;

  console.log(status)

  const certificate = await ProviderCertificateModel.findById(req.params.id);
  if (!certificate) throw new ApiError(404, "Certificate not found");

  if (title && title !== certificate.title) {
    await SlugModel.deleteOne({
      collectionName: "ProviderCertificate",
      documentId: certificate?._id
    });

    const newSlug = await generateUniqueSlug(
      title,
      "ProviderCertificate",
      certificate?._id,
      "provider-certificates"
    );

    certificate.slug = newSlug;
  }

  if (req.files?.image?.[0]) {
    if (certificate.image && fs.existsSync(path.join(process.cwd(), certificate.image))) {
      fs.unlinkSync(path.join(process.cwd(), certificate.image));
    };
    certificate.image = await compressImage(req.files.image[0].buffer, "certificate");
  };

  certificate.providerId = providerId || certificate.providerId;
  certificate.title = title || certificate.title;
  certificate.number = number || certificate.number;
  certificate.issuedFrom = issuedFrom || certificate.issuedFrom;
  certificate.issueDate = issueDate || certificate.issueDate;
  certificate.expiryDate = expiryDate || certificate.expiryDate;
  certificate.description = description || certificate.description;
  certificate.status = typeof status === "boolean" ? status : certificate.status;
  certificate.updatedBy = req.user?._id;
  certificate.updatedAt = new Date();

  await certificate.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: certificate });
});

export const deleteProviderCertificate = asyncHandler(async (req, res) => {
  const certificate = await ProviderCertificateModel.findById(req.params.id);
  if (!certificate) throw new ApiError(404, "Certificate not found");

  await SlugModel.deleteOne({
    collectionName: "ProviderCertificate",
    documentId: certificate?._id
  });

  if (certificate.image && fs.existsSync(path.join(process.cwd(), certificate.image))) {
    fs.unlinkSync(path.join(process.cwd(), certificate.image));
  };

  await certificate.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Certificate deleted successfully"
  });
});
