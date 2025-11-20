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
  let { search, page = 1, limit = 10, sort = "desc", services, category, subCategory, subSubCategory, subSubSubCategory } = req.query;

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
  if (services) filters.services = services;

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

// --------------------- UPDATE REQUIREMENT FROM CUSTOMER ---------------------
export const updateRequirementFromCustomer = asyncHandler(async (req, res) => {
  const {
    mainTitle,
    description,
    services,
    category,
    subCategory,
    subSubCategory,
    subSubSubCategory
  } = req.body;

  // --------------------- PARSE INCOMING ARRAYS ---------------------
  let removedIndexes = [];
  let incomingRequirements = [];

  try {
    removedIndexes = JSON.parse(req.body.removedIndexes || "[]");
    incomingRequirements = JSON.parse(req.body.newRequirements || "[]");
  } catch (err) {
    throw new ApiError(400, "Invalid JSON format in removedIndexes or newRequirements");
  }

  const uploadedIcons = req.files?.icons || [];

  // --------------------- FETCH EXISTING DOC ---------------------
  const requirement = await RequirementFromCustomerModel.findById(req.params.id);
  if (!requirement) throw new ApiError(404, "Requirement not found");

  let updatedRequirements = [...requirement.requirements];

  // --------------------- REMOVE SELECTED ITEMS ---------------------
  removedIndexes
    .sort((a, b) => b - a)
    .forEach((i) => {
      const old = updatedRequirements[i];
      if (old?.icon) {
        const filePath = path.join(process.cwd(), old.icon);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      updatedRequirements.splice(i, 1);
    });

  // --------------------- UPDATE EXISTING + ADD NEW ---------------------
  let iconFileIndex = 0;

  for (let index = 0; index < incomingRequirements.length; index++) {
    const item = incomingRequirements[index];
    const isNew = index >= updatedRequirements.length;

    // CASE A — NEW REQUIREMENT ADDED IN FRONTEND
    if (isNew) {
      if (item._hasFile) {
        const file = uploadedIcons[iconFileIndex++];
        if (!file) throw new ApiError(400, "Missing uploaded file for requirement");

        const compressed = await compressImage(file.buffer, "service");
        updatedRequirements.push({
          name: item.name,
          icon: compressed
        });
      } else {
        updatedRequirements.push({
          name: item.name,
          icon: ""
        });
      }
      continue;
    }

    // CASE B — UPDATING EXISTING REQUIREMENT
    updatedRequirements[index].name = item.name;

    if (item._hasFile) {
      const file = uploadedIcons[iconFileIndex++];
      if (!file) throw new ApiError(400, "Missing uploaded file for updated requirement");

      // delete old icon if exists
      if (updatedRequirements[index].icon) {
        const oldPath = path.join(process.cwd(), updatedRequirements[index].icon);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const compressed = await compressImage(file.buffer, "service");
      updatedRequirements[index].icon = compressed;
    }
  }

  // --------------------- UPDATE OTHER FIELDS ---------------------
  requirement.mainTitle = mainTitle || requirement.mainTitle;
  requirement.description = description || requirement.description;
  requirement.category = category || requirement.category;
  requirement.subCategory = subCategory || requirement.subCategory;
  requirement.subSubCategory = subSubCategory || requirement.subSubCategory;
  requirement.subSubSubCategory = subSubSubCategory || requirement.subSubSubCategory;

  // Services
  let updatedServices = requirement.services || [];
  if (services !== undefined) {
    let parsedServices = typeof services === "string" ? JSON.parse(services) : services;
    if (!Array.isArray(parsedServices)) throw new ApiError(400, "services must be an array");
    updatedServices = parsedServices;
  }

  requirement.services = updatedServices;
  requirement.requirements = updatedRequirements;

  await requirement.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: requirement
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
