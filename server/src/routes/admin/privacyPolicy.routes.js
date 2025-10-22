import express from "express";
import {
  createPrivacyPolicy,
  getPrivacyPolicies,
  getPrivacyPolicyById,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} from "../../controllers/admin/privacyPolicy.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createPrivacyPolicy);
router.get("/", isLoggedIn, getPrivacyPolicies);
router.get("/:id", isLoggedIn, getPrivacyPolicyById);
router.patch("/:id", isLoggedIn, updatePrivacyPolicy);
router.delete("/:id", isLoggedIn, deletePrivacyPolicy);

export default router;
