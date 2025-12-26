import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  getServicemanEarningDetail,
  getServicemanEarnings,
  updateServicemanPayoutStatus
} from "../../controllers/admin/servicemanEarning.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getServicemanEarnings);
router.get("/:earningId", isLoggedIn, getServicemanEarningDetail);
router.patch("/:earningId", isLoggedIn, updateServicemanPayoutStatus);

export default router;
