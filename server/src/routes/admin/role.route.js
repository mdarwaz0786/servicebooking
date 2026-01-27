import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createRole, deleteRole, getRoleById, getRoles, updateRole } from "../../controllers/admin/role.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createRole);
router.get("/", isLoggedIn, getRoles);
router.get("/:id", isLoggedIn, getRoleById);
router.patch("/:id", isLoggedIn, updateRole);
router.delete("/:id", isLoggedIn, deleteRole);

export default router;
