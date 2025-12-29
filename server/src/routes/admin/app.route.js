import express from "express";
import { deleteAppSettings, getAppSettings, upsertAppSettings } from "../../controllers/admin/app.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, upsertAppSettings);
router.get("/", isLoggedIn, getAppSettings);
router.delete("/", isLoggedIn, deleteAppSettings);

export default router;
