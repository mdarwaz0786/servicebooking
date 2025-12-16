import ExpertTechnicianModel from "../../models/expertTechnician.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE EXPERT TECHNICIAN ---------------------
export const createExpertTechnician = asyncHandler(async (req, res) => {
  const { mainTitle, services, points, category, subCategory, subSubCategory, subSubSubCategory } = req.body;

  if (!mainTitle) {
    throw new ApiError(400, "Main title is required");
  }

  let imagePath = null;

  try {
    // Main image
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "service");
    }

    // Points (with icon image uploads)
    let parsedPoints = points ? JSON.parse(points) : [];
    const uploadedIcons = [];

    if (req.files?.icons?.length) {
      for (let i = 0; i < req.files.icons.length; i++) {
        const file = req.files.icons[i];
        const compressedPath = await compressImage(file.buffer, "service");
        uploadedIcons.push(compressedPath);
      }
    }

    // Merge icon image paths with their titles
    const finalPoints = parsedPoints.map((p, i) => ({
      title: p.title,
      icon: uploadedIcons[i] || "",
    }));

    const expertTechnician = await ExpertTechnicianModel.create({
      mainTitle,
      points: finalPoints,
      image: imagePath,
      services,
      category,
      subCategory,
      subSubCategory,
      subSubSubCategory
    });

    return res
      .status(201)
      .json({ success: true, message: "Created successfully", data: expertTechnician });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// --------------------- GET ALL EXPERT TECHNICIANS ---------------------
export const getExpertTechnicians = asyncHandler(async (req, res) => {
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

  const experts = await ExpertTechnicianModel.find(filters)
    .populate("services")
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ExpertTechnicianModel.countDocuments(filters);
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
    data: experts,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE EXPERT TECHNICIAN ---------------------
export const getExpertTechnicianById = asyncHandler(async (req, res) => {
  const expertTechnician = await ExpertTechnicianModel.findById(req.params.id)
    .populate("category")
    .populate("subCategory")
    .populate("subSubCategory")
    .populate("subSubSubCategory")
    .populate("services")
    .lean();

  if (!expertTechnician) {
    throw new ApiError(404, "Expert technician not found");
  };
  return res.status(200).json({ success: true, data: expertTechnician });
});

// --------------------- UPDATE EXPERT TECHNICIAN ---------------------
export const updateExpertTechnician = asyncHandler(async (req, res) => {
  const {
    mainTitle,
    category,
    subCategory,
    subSubCategory,
    subSubSubCategory,
    services,
  } = req.body;

  // --------------------- PARSE INCOMING ARRAYS ---------------------
  let removedIndexes = [];
  let incomingPoints = [];

  try {
    removedIndexes = JSON.parse(req.body.removedIndexes || "[]");
    incomingPoints = JSON.parse(req.body.newPoints || "[]");
  } catch (err) {
    throw new ApiError(400, "Invalid JSON format in removedIndexes or newPoints");
  }

  const uploadedIcons = req.files?.icons || [];

  // --------------------- FETCH EXISTING DOC ---------------------
  const technician = await ExpertTechnicianModel.findById(req.params.id);
  if (!technician) throw new ApiError(404, "Expert technician not found");

  let updatedPoints = [...technician.points];

  // --------------------- REMOVE SELECTED POINTS ---------------------
  removedIndexes
    .sort((a, b) => b - a) // remove highest indexes first
    .forEach((i) => {
      const old = updatedPoints[i];
      if (old?.icon) {
        const filePath = path.join(process.cwd(), old.icon);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      updatedPoints.splice(i, 1);
    });

  // --------------------- UPDATE EXISTING + ADD NEW POINTS ---------------------
  let iconFileIndex = 0;

  for (let index = 0; index < incomingPoints.length; index++) {
    const point = incomingPoints[index];
    const isNew = index >= updatedPoints.length;

    // NEW POINT ADDED
    if (isNew) {
      if (point._hasFile) {
        const file = uploadedIcons[iconFileIndex++];
        if (!file) throw new ApiError(400, "Missing uploaded file for new point");

        const compressed = await compressImage(file.buffer, "service");
        updatedPoints.push({ title: point.title, icon: compressed });
      } else {
        updatedPoints.push({ title: point.title, icon: "" });
      }
      continue;
    }

    // UPDATING EXISTING POINT
    updatedPoints[index].title = point.title;

    if (point._hasFile) {
      const file = uploadedIcons[iconFileIndex++];
      if (!file) throw new ApiError(400, "Missing uploaded file for updated point");

      // delete old icon if exists
      if (updatedPoints[index].icon) {
        const oldPath = path.join(process.cwd(), updatedPoints[index].icon);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const compressed = await compressImage(file.buffer, "service");
      updatedPoints[index].icon = compressed;
    }
  }

  // --------------------- UPDATE OTHER FIELDS ---------------------
  technician.mainTitle = mainTitle || technician.mainTitle;
  technician.category = category || technician.category;
  technician.subCategory = subCategory || technician.subCategory;
  technician.subSubCategory = subSubCategory || technician.subSubCategory;
  technician.subSubSubCategory = subSubSubCategory || technician.subSubSubCategory;

  // Services handling
  let updatedServices = technician.services || [];
  if (services !== undefined) {
    let parsedServices = typeof services === "string" ? JSON.parse(services) : services;
    if (!Array.isArray(parsedServices)) throw new ApiError(400, "services must be an array");
    updatedServices = parsedServices;
  }
  technician.services = updatedServices;

  // --------------------- HANDLE SINGLE IMAGE ---------------------
  if (req.files?.image?.[0]) {
    if (technician.image && fs.existsSync(path.join(process.cwd(), technician.image))) {
      fs.unlinkSync(path.join(process.cwd(), technician.image));
    }
    technician.image = await compressImage(req.files.image[0].buffer, "service");
  }

  // --------------------- SAVE FINAL ---------------------
  technician.points = updatedPoints;
  await technician.save();

  return res.status(200).json({
    success: true,
    message: "Expert technician updated successfully",
    data: technician,
  });
});

// --------------------- DELETE EXPERT TECHNICIAN ---------------------
export const deleteExpertTechnician = asyncHandler(async (req, res) => {
  const expertTechnician = await ExpertTechnicianModel.findById(req.params.id);
  if (!expertTechnician) {
    throw new ApiError(404, "Expert technician not found");
  };

  if (expertTechnician.image && fs.existsSync(path.join(process.cwd(), expertTechnician.image))) {
    fs.unlinkSync(path.join(process.cwd(), expertTechnician.image));
  };

  await expertTechnician.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
