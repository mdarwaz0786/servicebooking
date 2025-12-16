import express from "express";
import { getMetaTagBySlug, getMetaTags } from "../../controllers/common/metaTag.controller.js";

const router = express.Router();

router.get("/", getMetaTags);
router.get("/:slug", getMetaTagBySlug);

export default router;
