import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { getSupportContent, upsertSupportContent } from "../../controllers/serviceman/supportContent.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, upsertSupportContent);
router.get("/", isLoggedIn, getSupportContent);

export default router;
