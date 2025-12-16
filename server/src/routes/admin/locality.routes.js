import express from "express";
import {
  createLocality,
  getLocalities,
  getLocalityById,
  updateLocality,
  deleteLocality
} from "../../controllers/admin/locality.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createLocality);
router.get("/", isLoggedIn, getLocalities);
router.get("/:id", isLoggedIn, getLocalityById);
router.patch("/:id", isLoggedIn, updateLocality);
router.delete("/:id", isLoggedIn, deleteLocality);

export default router;
