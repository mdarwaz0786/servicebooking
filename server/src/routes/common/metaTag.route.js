import express from "express";
import { getMetaTagById, getMetaTags } from "../../controllers/common/metaTag.controller.js";

const router = express.Router();


router.get("/", getMetaTags);
router.get("/:id", getMetaTagById);

export default router;
