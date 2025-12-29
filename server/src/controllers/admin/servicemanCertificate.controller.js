import ServicemanCertificateModel from "../../models/servicemanCertificate.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";
import compressImage from "../../helpers/compressImage.js";

// Create certificate
export const createServicemanCertificate = asyncHandler(async (req, res) => {
  const {
    serviceman,
    title,
    certificateNumber,
    issuedFrom,
    issueDate,
    expiryDate,
    description,
    certificateStatus,
  } = req.body;

  if (!serviceman) {
    throw new ApiError(400, "Serviceman is required");
  }

  if (!title || !certificateNumber || !issuedFrom || !issueDate) {
    throw new ApiError(400, "Required fields are missing");
  }

  let filePath = null;

  try {
    if (req.files?.file?.[0]) {
      filePath = await compressImage(req.files.file[0].buffer, "certificate");
    };

    const certificate = await ServicemanCertificateModel.create({
      serviceman,
      title,
      certificateNumber,
      issuedFrom,
      issueDate,
      expiryDate,
      description,
      certificateStatus,
      file: filePath,
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: certificate,
    });
  } catch (error) {
    if (filePath && fs.existsSync(path.join(process.cwd(), filePath))) {
      fs.unlinkSync(path.join(process.cwd(), filePath));
    }
    if (error.code === 11000) {
      throw new ApiError(409, "Certificate already exists");
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// Get all certificate
export const getServicemanCertificates = asyncHandler(async (req, res) => {
  let {
    search,
    serviceman,
    certificateStatus,
    status,
    sort = "desc",
    page,
    limit,
  } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};

  if (serviceman) {
    filters.serviceman = serviceman;
  }

  if (certificateStatus !== undefined) {
    filters.certificateStatus = certificateStatus;
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { certificateNumber: { $regex: search, $options: "i" } },
      { issuedFrom: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const certificates = await ServicemanCertificateModel
    .find(filters)
    .populate("serviceman")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ServicemanCertificateModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: certificates,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get certificale detail
export const getServicemanCertificateById = asyncHandler(async (req, res) => {
  const certificate = await ServicemanCertificateModel.findById(req.params.id).populate("serviceman");

  if (!certificate) {
    throw new ApiError(404, "Serviceman certificate not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: certificate,
  });
});

// Update certificate
export const updateServicemanCertificate = asyncHandler(async (req, res) => {
  const {
    title,
    certificateNumber,
    issuedFrom,
    issueDate,
    expiryDate,
    description,
    certificateStatus,
    status,
  } = req.body;

  const certificate = await ServicemanCertificateModel.findById(req.params.id);
  if (!certificate) {
    throw new ApiError(404, "Serviceman certificate not found");
  }

  if (req.files?.file?.[0]) {
    if (certificate.file && fs.existsSync(path.join(process.cwd(), certificate.file))) {
      fs.unlinkSync(path.join(process.cwd(), certificate.file));
    };
    certificate.file = await compressImage(req.files.file[0].buffer, "certificate");
  };

  certificate.title = title || certificate.title;
  certificate.certificateNumber = certificateNumber || certificate.certificateNumber;
  certificate.issuedFrom = issuedFrom || certificate.issuedFrom;
  certificate.issueDate = issueDate || certificate.issueDate;
  certificate.expiryDate = expiryDate || certificate.expiryDate;
  certificate.description = description || certificate.description;
  certificate.certificateStatus = certificateStatus || certificate.certificateStatus;
  certificate.status = typeof status === "boolean" ? status : certificate.status;
  certificate.updatedBy = req.user?._id;
  certificate.updatedAt = new Date();

  await certificate.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: certificate,
  });
});

// Delete certificate
export const deleteServicemanCertificate = asyncHandler(async (req, res) => {
  const certificate = await ServicemanCertificateModel.findById(req.params.id);
  if (!certificate) {
    throw new ApiError(404, "Serviceman certificate not found");
  }

  if (certificate.file && fs.existsSync(path.join(process.cwd(), certificate.file))) {
    fs.unlinkSync(path.join(process.cwd(), certificate.file));
  };

  await certificate.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});



