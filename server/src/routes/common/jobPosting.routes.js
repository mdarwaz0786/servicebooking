import express from "express";
import {
  getJobPostings,
  getJobPostingById,
} from "../../controllers/common/jobPosting.controller.js";

const router = express.Router();

router.get("/", getJobPostings);
router.get("/:id", getJobPostingById);

export default router;
