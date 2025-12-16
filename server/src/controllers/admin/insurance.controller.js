import InsuranceModel from "../../models/insurance.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import { buildPagination } from "../../utils/pagination.js";
import compressImage from "../../helpers/compressImage.js";

export const createInsurance = asyncHandler(async (req, res) => {
  const {
    providerId,
    companyName,
    policyNumber,
    insuranceType,
    issueDate,
    expiryDate,
    coverageDetail,
    emergencyNumber,
  } = req.body;

  if (!providerId) throw new ApiError(400, "Provider ID is required");
  if (!companyName) throw new ApiError(400, "Company name is required");
  if (!policyNumber) throw new ApiError(400, "Policy number is required");

  let imagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "insurance");
    }

    let insurance = await InsuranceModel.create({
      providerId,
      companyName,
      policyNumber,
      insuranceType,
      issueDate,
      expiryDate,
      coverageDetail,
      emergencyNumber,
      image: imagePath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(
      companyName,
      "Insurance",
      insurance._id,
      "insurances"
    );
    insurance.slug = slug;
    await insurance.save();

    return res.status(201).json({ success: true, data: insurance });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getInsurances = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { companyName: { $regex: search, $options: "i" } },
      { policyNumber: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.isRenewed = status === "true";
  }

  let sortOption = {};
  sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const insurances = await InsuranceModel.find(filters)
    .populate("providerId")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await InsuranceModel.countDocuments(filters);
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
    data: insurances,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getInsuranceById = asyncHandler(async (req, res) => {
  const insurance = await InsuranceModel.findById(req.params.id).populate(
    "providerId"
  );

  if (!insurance) {
    throw new ApiError(404, "Insurance not found");
  }

  return res.status(200).json({ success: true, data: insurance });
});

export const updateInsurance = asyncHandler(async (req, res) => {
  const {
    providerId,
    companyName,
    policyNumber,
    insuranceType,
    issueDate,
    expiryDate,
    coverageDetail,
    emergencyNumber,
    remarks,
    isRenewed,
    status,
  } = req.body;

  const insurance = await InsuranceModel.findById(req.params.id);
  if (!insurance) {
    throw new ApiError(404, "Insurance not found");
  }

  if (companyName && companyName !== insurance.companyName) {
    await SlugModel.deleteOne({
      collectionName: "Insurance",
      documentId: insurance._id,
    });

    const newSlug = await generateUniqueSlug(
      companyName,
      "Insurance",
      insurance._id,
      "insurances"
    );
    insurance.slug = newSlug;
  }

  if (req.files?.image?.[0]) {
    if (insurance.image && fs.existsSync(path.join(process.cwd(), insurance.image))) {
      fs.unlinkSync(path.join(process.cwd(), insurance.image));
    }
    insurance.image = await compressImage(req.files.image[0].buffer, "insurances");
  }

  insurance.providerId = providerId || insurance.providerId;
  insurance.companyName = companyName || insurance.companyName;
  insurance.policyNumber = policyNumber || insurance.policyNumber;
  insurance.insuranceType = insuranceType || insurance.insuranceType;
  insurance.issueDate = issueDate || insurance.issueDate;
  insurance.expiryDate = expiryDate || insurance.expiryDate;
  insurance.coverageDetail = coverageDetail || insurance.coverageDetail;
  insurance.emergencyNumber = emergencyNumber || insurance.emergencyNumber;
  insurance.remarks = remarks || insurance.remarks;
  insurance.isRenewed = typeof isRenewed === "boolean" ? isRenewed : insurance.isRenewed;
  insurance.status = typeof status == "boolean" ? status : insurance.status;
  insurance.updatedBy = req.user?._id;
  insurance.updatedAt = new Date();

  await insurance.save();

  return res.status(200).json({
    success: true,
    data: insurance,
  });
});

export const deleteInsurance = asyncHandler(async (req, res) => {
  const insurance = await InsuranceModel.findById(req.params.id);
  if (!insurance) {
    throw new ApiError(404, "Insurance not found");
  }

  await SlugModel.deleteOne({
    collectionName: "Insurance",
    documentId: insurance._id,
  });

  await insurance.deleteOne();

  return res
    .status(200)
    .json({ success: true, message: "Insurance deleted successfully" });
});
