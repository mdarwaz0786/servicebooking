import express from "express";
import {
  createHomePageService,
  getHomePageServices,
  getHomePageServiceById,
  updateHomePageService,
  deleteHomePageService
} from "../../controllers/admin/homePageService.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createHomePageService);
router.patch("/:id", isLoggedIn, updateHomePageService);
router.get("/", getHomePageServices);
router.get("/:id", getHomePageServiceById);
router.delete("/:id", isLoggedIn, deleteHomePageService);

export default router;
