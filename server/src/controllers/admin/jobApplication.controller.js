import JobApplicationModel from "../../models/jobApplication.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Get All Job Applications
export const getJobApplications = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    filters.status = status;
  }

  let sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const jobApplications = await JobApplicationModel.find(filters)
    .populate("jobId")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await JobApplicationModel.countDocuments(filters);
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
    data: jobApplications,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single Job Application
export const getJobApplicationById = asyncHandler(async (req, res) => {
  const jobApplication = await JobApplicationModel.findById(req.params.id).populate("jobId");

  if (!jobApplication) throw new ApiError(404, "Job Application not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: jobApplication });
});

// Update Job Application
export const updateJobApplication = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const jobApplication = await JobApplicationModel.findById(req.params.id);
  if (!jobApplication) throw new ApiError(404, "Job Application not found");

  jobApplication.status = status || jobApplication.status;

  await jobApplication.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: jobApplication });
});

// Delete Job Application
export const deleteJobApplication = asyncHandler(async (req, res) => {
  const jobApplication = await JobApplicationModel.findById(req.params.id);
  if (!jobApplication) throw new ApiError(404, "Job Application not found");

  if (jobApplication.resume && fs.existsSync(path.join(process.cwd(), jobApplication.resume))) {
    fs.unlinkSync(path.join(process.cwd(), jobApplication.resume));
  }

  await jobApplication.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
