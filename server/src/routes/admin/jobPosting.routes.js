import express from "express";
import {
  createJobPosting,
  getJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting
} from "../../controllers/admin/jobPosting.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createJobPosting);
router.get("/", isLoggedIn, getJobPostings);
router.get("/:id", isLoggedIn, getJobPostingById);
router.patch("/:id", isLoggedIn, updateJobPosting);
router.delete("/:id", isLoggedIn, deleteJobPosting);

export default router;
