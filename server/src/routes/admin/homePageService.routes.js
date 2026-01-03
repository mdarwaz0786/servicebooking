import express from "express";
import {
  createHomePageService,
  getHomePageServices,
  getHomePageServiceById,
  updateHomePageService,
  deleteHomePageService,
  getSubCategories,
  getSubSubCategories,
  getSubSubSubCategories,
  getServices
} from "../../controllers/admin/homePageService.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/sub-category", isLoggedIn, getSubCategories);
router.get("/sub-sub-category", isLoggedIn, getSubSubCategories);
router.get("/sub-sub-sub-category", isLoggedIn, getSubSubSubCategories);
router.get("/service", isLoggedIn, getServices);

router.post("/", isLoggedIn, createHomePageService);
router.patch("/:id", isLoggedIn, updateHomePageService);
router.get("/", getHomePageServices);
router.get("/:id", getHomePageServiceById);
router.delete("/:id", isLoggedIn, deleteHomePageService);

export default router;
