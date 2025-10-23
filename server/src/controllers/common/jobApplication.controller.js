import JobApplicationModel from "../../models/jobApplication.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressPdf from "../../helpers/compressPdf.js";
import fs from "fs";
import path from "path";

// Create Job Application
export const createJobApplication = asyncHandler(async (req, res) => {
  const { jobId, name, email, mobile } = req.body;

  if (!jobId) throw new ApiError(400, "Job ID is required");
  if (!name || !name.trim()) throw new ApiError(400, "Name is required");
  if (!email || !email.trim()) throw new ApiError(400, "Email is required");
  if (!mobile || !mobile.trim()) throw new ApiError(400, "Mobile is required");
  if (!req.files?.resume?.[0]) throw new ApiError(400, "Resume file is required");

  let resumePath = null;

  try {
    resumePath = await compressPdf(req.files.resume[0].buffer, "resume");

    const jobApplication = await JobApplicationModel.create({
      jobId,
      name,
      email,
      mobile,
      resume: resumePath,
    });

    return res.status(201).json({ success: true, message: "Job applied successfully", data: jobApplication });
  } catch (error) {
    if (resumePath && fs.existsSync(path.join(process.cwd(), resumePath))) {
      fs.unlinkSync(path.join(process.cwd(), resumePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});