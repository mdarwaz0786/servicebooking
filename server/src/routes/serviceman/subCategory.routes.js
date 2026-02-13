import express from "express";
import { getSubCategories } from "../../controllers/serviceman/subCategory.controller.js";

const router = express.Router();

router.get("/", getSubCategories);

export default router;
