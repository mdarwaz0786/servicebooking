import express from "express";
import {
  createRefundPolicy,
  getRefundPolicies,
  getRefundPolicyById,
  updateRefundPolicy,
  deleteRefundPolicy,
} from "../../controllers/admin/refundPolicy.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createRefundPolicy);
router.get("/", isLoggedIn, getRefundPolicies);
router.get("/:id", isLoggedIn, getRefundPolicyById);
router.patch("/:id", isLoggedIn, updateRefundPolicy);
router.delete("/:id", isLoggedIn, deleteRefundPolicy);

export default router;
