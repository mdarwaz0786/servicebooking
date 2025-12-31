import express from "express";
import { getSupportContent } from "../../controllers/serviceman/supportContent.controller.js";

const router = express.Router();

router.get("/", getSupportContent);

export default router;
