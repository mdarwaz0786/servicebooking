import express from "express";
import { getAppSettings } from "../../controllers/common/app.controller.js";

const router = express.Router();

router.get("/", getAppSettings);

export default router;
