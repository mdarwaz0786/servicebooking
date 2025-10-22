import express from "express";
import {
  getPrivacyPolicies,
  getPrivacyPolicyById,
} from "../../controllers/common/privacyPolicy.controller.js";

const router = express.Router();

router.get("/", getPrivacyPolicies);
router.get("/:id", getPrivacyPolicyById);

export default router;
