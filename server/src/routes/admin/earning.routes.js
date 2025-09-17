import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createEarning,
  getEarnings,
  getEarningById,
  updateEarning,
  deleteEarning,
} from "../../controllers/admin/earning.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createEarning);
router.get("/", getEarnings);
router.get("/:id", getEarningById);
router.patch("/:id", isLoggedIn, updateEarning);
router.delete("/:id", isLoggedIn, deleteEarning);

export default router;
