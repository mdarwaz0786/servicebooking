import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { getDisclaimerById, getDisclaimers } from "../../controllers/common/disclaimer.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getDisclaimers);
router.get("/:id", isLoggedIn, getDisclaimerById);

export default router;
