import express from "express";
import {
  deleteSupportContent,
  getSupportContent,
  upsertSupportContent
} from "../../controllers/admin/support.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getSupportContent);
router.post("/", isLoggedIn, upsertSupportContent);
router.patch("/", isLoggedIn, upsertSupportContent);
router.delete("/", isLoggedIn, deleteSupportContent);

export default router;
