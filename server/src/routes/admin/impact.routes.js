import express from "express";
import {
  createImpact,
  getImpacts,
  getImpactById,
  updateImpact,
  deleteImpact,
} from "../../controllers/admin/impact.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createImpact);
router.get("/", isLoggedIn, getImpacts);
router.get("/:id", getImpactById);
router.patch("/:id", isLoggedIn, updateImpact);
router.delete("/:id", isLoggedIn, deleteImpact);

export default router;
