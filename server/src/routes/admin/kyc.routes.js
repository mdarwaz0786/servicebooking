import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createKyc,
  getKycs,
  getKycById,
  updateKyc,
  deleteKyc,
} from "../../controllers/admin/kyc.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createKyc);
router.get("/", isLoggedIn, getKycs);
router.get("/:id", isLoggedIn, getKycById);
router.patch("/:id", isLoggedIn, updateKyc);
router.delete("/:id", isLoggedIn, deleteKyc);

export default router;
