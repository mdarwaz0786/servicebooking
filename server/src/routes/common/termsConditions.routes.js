import express from "express";
import {
  getTermsList,
  getTermsById,
} from "../../controllers/common/termsConditions.controller.js";

const router = express.Router();

router.get("/", getTermsList);
router.get("/:id", getTermsById);

export default router;
