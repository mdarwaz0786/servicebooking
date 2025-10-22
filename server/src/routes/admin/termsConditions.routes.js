import express from "express";
import {
  createTerms,
  getTermsList,
  getTermsById,
  updateTerms,
  deleteTerms,
} from "../../controllers/admin/termsConditions.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createTerms);
router.get("/", isLoggedIn, getTermsList);
router.get("/:id", isLoggedIn, getTermsById);
router.patch("/:id", isLoggedIn, updateTerms);
router.delete("/:id", isLoggedIn, deleteTerms);

export default router;
