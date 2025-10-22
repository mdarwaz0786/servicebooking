import express from "express";
import { createContactEnquiry } from "../../controllers/common/contactEnquiry.controller.js";

const router = express.Router();

router.post("/", createContactEnquiry);

export default router;
