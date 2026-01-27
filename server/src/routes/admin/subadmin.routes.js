import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createSubAdmin, deleteSubAdmin, getSubAdminById, getSubAdmins, updateSubAdmin } from "../../controllers/admin/subadmin.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createSubAdmin);
router.get("/", isLoggedIn, getSubAdmins);
router.get("/:id", isLoggedIn, getSubAdminById);
router.patch("/:id", isLoggedIn, updateSubAdmin);
router.delete("/:id", isLoggedIn, deleteSubAdmin);

export default router;
