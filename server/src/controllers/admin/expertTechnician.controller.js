import ExpertTechnicianModel from "../../models/expertTechnician.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE EXPERT TECHNICIAN ---------------------
export const createExpertTechnician = asyncHandler(async (req, res) => {
  const { mainTitle, services, points } = req.body;

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
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.mainTitle = { $regex: search, $options: "i" };
  };

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const experts = await ExpertTechnicianModel.find(filters)
    .populate("services")
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
  const expertTechnician = await ExpertTechnicianModel.findById(req.params.id).populate("services").lean();
  if (!expertTechnician) {
    throw new ApiError(404, "Expert technician not found");
  };
  return res.status(200).json({ success: true, data: expertTechnician });
});

// --------------------- UPDATE EXPERT TECHNICIAN ---------------------
export const updateExpertTechnician = asyncHandler(async (req, res) => {
  const { mainTitle } = req.body

  let existingPoints = []
  if (req.body.existingPoints) {
    try {
      existingPoints = JSON.parse(req.body.existingPoints)
    } catch (err) {
      throw new ApiError(400, "Invalid existingPoints format")
    };
  };

  const expertTechnician = await ExpertTechnicianModel.findById(req.params.id)
  if (!expertTechnician) {
    throw new ApiError(404, "Expert technician not found")
  };

  let updatedPoints = []

  if (existingPoints.length > 0) {
    updatedPoints = expertTechnician.points.filter((p) =>
      existingPoints.some((ep) => ep.icon === p.icon && ep.title === p.title)
    );

    expertTechnician.points.forEach((p) => {
      if (
        !existingPoints.some((ep) => ep.icon === p.icon && ep.title === p.title) &&
        p.icon &&
        fs.existsSync(path.join(process.cwd(), p.icon))
      ) {
        fs.unlinkSync(path.join(process.cwd(), p.icon))
      };
    });
  } else {
    expertTechnician.points.forEach((p) => {
      if (p.icon && fs.existsSync(path.join(process.cwd(), p.icon))) {
        fs.unlinkSync(path.join(process.cwd(), p.icon))
      };
    });
  };

  if (req.files?.icons?.length) {
    for (const file of req.files.icons) {
      const compressedPath = await compressImage(file.buffer, "service")
      updatedPoints.push({ icon: compressedPath, title: file.originalname })
    };
  };

  expertTechnician.points = updatedPoints
  expertTechnician.mainTitle = mainTitle || expertTechnician.mainTitle

  if (req.files?.image?.[0]) {
    if (expertTechnician.image && fs.existsSync(path.join(process.cwd(), expertTechnician.image))) {
      fs.unlinkSync(path.join(process.cwd(), expertTechnician.image))
    };
    expertTechnician.image = await compressImage(req.files.image[0].buffer, "service")
  };

  await expertTechnician.save()

  return res.status(200).json({
    success: true,
    message: "Expert technician updated successfully",
    data: expertTechnician,
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
