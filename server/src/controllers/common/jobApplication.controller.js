import JobApplicationModel from "../../models/jobApplication.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";

// Create Job Application
export const createJobApplication = asyncHandler(async (req, res) => {
  const {
    jobId,
    name,
    email,
    mobile,
    highestQualification,
    skills,
    totalExprienceYear,
    totalExprienceMonth,
    lastCompanyName,
    status,
  } = req.body;

  // Validation for required fields
  if (!jobId) throw new ApiError(400, "Job ID is required");
  if (!name || !name.trim()) throw new ApiError(400, "Name is required");
  if (!email || !email.trim()) throw new ApiError(400, "Email is required");
  if (!mobile || !mobile.trim()) throw new ApiError(400, "Mobile is required");
  if (!req.files?.resume?.[0]) throw new ApiError(400, "Resume file is required");

  let resumePath = null;

  try {
    // Compress and save resume
    resumePath = await compressImage(req.files.resume[0].buffer, "resume");

    // Create job application
    const jobApplication = await JobApplicationModel.create({
      jobId,
      name,
      email,
      mobile,
      highestQualification: highestQualification?.trim() || "",
      skills: skills?.trim() || "",
      totalExprienceYear: totalExprienceYear?.trim() || "",
      totalExprienceMonth: totalExprienceMonth?.trim() || "",
      lastCompanyName: lastCompanyName?.trim() || "",
      resume: resumePath,
      status: status && ["Pending", "Reviewed", "Accepted", "Rejected"].includes(status) ? status : "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Job applied successfully",
      data: jobApplication,
    });
  } catch (error) {
    // Cleanup if resume was saved but error occurred
    if (resumePath && fs.existsSync(path.join(process.cwd(), resumePath))) {
      fs.unlinkSync(path.join(process.cwd(), resumePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});
