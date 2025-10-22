import JobPostingModel from "../../models/jobPosting.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE JOB POSTING ---------------------
export const createJobPosting = asyncHandler(async (req, res) => {
  const { title, location, employmentType, shortDescription, fullDescription } = req.body;

  if (!title || !location || !employmentType || !shortDescription || !fullDescription) {
    throw new ApiError(400, "All fields are required");
  }

  const job = await JobPostingModel.create({
    title,
    location,
    employmentType,
    shortDescription,
    fullDescription,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: job });
});

// --------------------- GET ALL JOB POSTINGS ---------------------
export const getJobPostings = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
    ];
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const jobs = await JobPostingModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await JobPostingModel.countDocuments(filters);
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
    data: jobs,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE JOB POSTING ---------------------
export const getJobPostingById = asyncHandler(async (req, res) => {
  const job = await JobPostingModel.findById(req.params.id).lean();

  if (!job) {
    throw new ApiError(404, "Job posting not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: job });
});

// --------------------- UPDATE JOB POSTING ---------------------
export const updateJobPosting = asyncHandler(async (req, res) => {
  const { title, location, employmentType, shortDescription, fullDescription, status } = req.body;

  const job = await JobPostingModel.findById(req.params.id);
  if (!job) {
    throw new ApiError(404, "Job posting not found");
  }

  job.title = title || job.title;
  job.location = location || job.location;
  job.employmentType = employmentType || job.employmentType;
  job.shortDescription = shortDescription || job.shortDescription;
  job.fullDescription = fullDescription || job.fullDescription;
  job.status = status !== undefined ? status : job.status;

  await job.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: job });
});

// --------------------- DELETE JOB POSTING ---------------------
export const deleteJobPosting = asyncHandler(async (req, res) => {
  const job = await JobPostingModel.findById(req.params.id);
  if (!job) {
    throw new ApiError(404, "Job posting not found");
  }

  await job.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
