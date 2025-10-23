import express from "express";
import {
  getJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} from "../../controllers/admin/jobApplication.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getJobApplications);
router.get("/:id", isLoggedIn, getJobApplicationById);
router.patch("/:id", isLoggedIn, updateJobApplication);
router.delete("/:id", isLoggedIn, deleteJobApplication);

export default router;
