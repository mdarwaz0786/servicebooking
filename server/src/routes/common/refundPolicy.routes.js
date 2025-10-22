import express from "express";
import {
  getRefundPolicies,
  getRefundPolicyById,
} from "../../controllers/common/refundPolicy.controller.js";

const router = express.Router();

router.get("/", getRefundPolicies);
router.get("/:id", getRefundPolicyById);

export default router;
