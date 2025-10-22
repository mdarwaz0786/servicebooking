import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const JobPostingModel = mongoose.model("JobPosting", jobPostingSchema);

export default JobPostingModel;
