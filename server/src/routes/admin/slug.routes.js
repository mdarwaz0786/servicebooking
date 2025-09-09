import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { getDataBySlug } from "../../controllers/admin/slug.controller.js";

const router = express.Router();

// Get data by slug
router.get("/:slug", isLoggedIn, getDataBySlug);

export default router;
