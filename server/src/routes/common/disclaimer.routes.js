import express from "express";
import { getDisclaimerById, getDisclaimers } from "../../controllers/common/disclaimer.controller.js";

const router = express.Router();

router.get("/", getDisclaimers);
router.get("/:id", getDisclaimerById);

export default router;
