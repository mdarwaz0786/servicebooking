import RequirementFromCustomerModel from "../../models/requirementFromCustomer.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE REQUIREMENT FROM CUSTOMER ---------------------
export const createRequirementFromCustomer = asyncHandler(async (req, res) => {
  const { mainTitle, requirements, services, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  if (!mainTitle) {
    throw new ApiError(400, "Main title is required");
  };

  let requirementsArray = [];
  if (requirements) {
    requirementsArray = typeof requirements === "string" ? JSON.parse(requirements) : requirements;
  };

  if (req.files?.icons?.length) {
    for (let i = 0; i < req.files.icons.length; i++) {
      const file = req.files.icons[i];
      const compressedPath = await compressImage(file.buffer, "service");
      if (requirementsArray[i]) {
        requirementsArray[i].icon = compressedPath;
      };
    };
  };

  const requirement = await RequirementFromCustomerModel.create({
    mainTitle,
    requirements: requirementsArray,
    services,
    category,
    subCategory,
    subSubCategory,
    subSubSubCategory
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: requirement });
});

// --------------------- GET ALL REQUIREMENTS ---------------------
export const getRequirementsFromCustomer = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc", category, subCategory, subSubCategory, subSubSubCategory } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.mainTitle = { $regex: search, $options: "i" };
  };

  if (category) filters.category = category;
  if (subCategory) filters.subCategory = subCategory;
  if (subSubCategory) filters.subSubCategory = subSubCategory;
  if (subSubSubCategory) filters.subSubSubCategory = subSubSubCategory;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const requirements = await RequirementFromCustomerModel.find(filters)
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await RequirementFromCustomerModel.countDocuments(filters);
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
    data: requirements,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE REQUIREMENT ---------------------
export const getRequirementFromCustomerById = asyncHandler(async (req, res) => {
  const requirement = await RequirementFromCustomerModel.findById(req.params.id)
    .populate("services")
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory").lean();

  if (!requirement) {
    throw new ApiError(404, "Requirement not found");
  };
  return res.status(200).json({ success: true, message: "Data fetched successfully", data: requirement });
});

// --------------------- UPDATE REQUIREMENT ---------------------
export const updateRequirementFromCustomer = asyncHandler(async (req, res) => {
  const { mainTitle, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  let existingRequirements = [];
  if (req.body.existingRequirements) {
    try {
      existingRequirements =
        typeof req.body.existingRequirements === "string"
          ? JSON.parse(req.body.existingRequirements)
          : req.body.existingRequirements;
    } catch (err) {
      throw new ApiError(400, "Invalid existingRequirements format");
    };
  };

  const requirement = await RequirementFromCustomerModel.findById(req.params.id);
  if (!requirement) {
    throw new ApiError(404, "Requirement not found");
  };

  let updatedRequirements = [];

  if (existingRequirements.length > 0) {
    updatedRequirements = requirement.requirements.filter((r) =>
      existingRequirements.some((er) => er.name === r.name && er.icon === r.icon)
    );

    requirement.requirements.forEach((r) => {
      if (
        !existingRequirements.some((er) => er.name === r.name && er.icon === r.icon) &&
        r.icon &&
        fs.existsSync(path.join(process.cwd(), r.icon))
      ) {
        fs.unlinkSync(path.join(process.cwd(), r.icon));
      };
    });
  } else {
    requirement.requirements.forEach((r) => {
      if (r.icon && fs.existsSync(path.join(process.cwd(), r.icon))) {
        fs.unlinkSync(path.join(process.cwd(), r.icon));
      };
    });
  };

  if (req.files?.icons?.length) {
    for (const file of req.files.icons) {
      const compressedPath = await compressImage(file.buffer, "service");
      updatedRequirements.push({ icon: compressedPath, name: file.originalname });
    };
  };

  requirement.requirements = updatedRequirements;
  requirement.mainTitle = mainTitle || requirement.mainTitle;
  requirement.category = category || requirement?.category;
  requirement.subCategory = subCategory || requirement?.subCategory;
  requirement.subSubCategory = subSubCategory || requirement?.subSubCategory;
  requirement.subSubSubCategory = subSubSubCategory || requirement?.subSubSubCategory;

  await requirement.save();

  return res.status(200).json({
    success: true,
    message: "Requirement updated successfully",
    data: requirement,
  });
});

// --------------------- DELETE REQUIREMENT ---------------------
export const deleteRequirementFromCustomer = asyncHandler(async (req, res) => {
  const requirement = await RequirementFromCustomerModel.findById(req.params.id);
  if (!requirement) {
    throw new ApiError(404, "Requirement not found");
  };

  requirement.requirements.forEach((reqItem) => {
    if (reqItem.icon && fs.existsSync(path.join(process.cwd(), reqItem.icon))) {
      fs.unlinkSync(path.join(process.cwd(), reqItem.icon));
    };
  });

  await requirement.deleteOne();

  return res.status(200).json({ success: true, message: "Requirement deleted successfully" });
});
