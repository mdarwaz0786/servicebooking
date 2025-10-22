import express from "express";
import {
  getContactEnquiries,
  getContactEnquiryById,
  deleteContactEnquiry,
} from "../../controllers/admin/contactEnquiry.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getContactEnquiries);
router.get("/:id", isLoggedIn, getContactEnquiryById);
router.delete("/:id", isLoggedIn, deleteContactEnquiry);

export default router;
