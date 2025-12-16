import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPosting",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  highestQualification: {
    type: String,
    trim: true,
  },
  skills: {
    type: String,
    trim: true,
  },
  totalExprienceYear: {
    type: String,
    trim: true,
  },
  totalExprienceMonth: {
    type: String,
    trim: true,
  },
  lastCompanyName: {
    type: String,
    trim: true,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
    default: "Pending",
  },
}, { timestamps: true });

const JobApplicationModel = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplicationModel;
