import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createGIPromise,
  getGIPromises,
  getGIPromiseById,
  updateGIPromise,
  deleteGIPromise,
} from "../../controllers/admin/giPromise.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createGIPromise);
router.get("/", isLoggedIn, getGIPromises);
router.get("/:id", isLoggedIn, getGIPromiseById);
router.patch("/:id", isLoggedIn, updateGIPromise);
router.delete("/:id", isLoggedIn, deleteGIPromise);

export default router;
