import express from "express";
import {
  getImpacts,
  getImpactById,
} from "../../controllers/common/impact.controller.js";

const router = express.Router();

router.get("/", getImpacts);
router.get("/:id", getImpactById);

export default router;
