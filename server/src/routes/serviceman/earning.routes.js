import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import {
  getEarnings,
  getEarningById,
} from "../../controllers/serviceman/earning.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getEarnings);
router.get("/:id", isLoggedIn, getEarningById);

export default router;
