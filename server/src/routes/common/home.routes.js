import express from "express";
import isLoggedIn from "../../middlewares/common/auth.middleware.js";
import { getHomePageData } from "../../controllers/common/home.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getHomePageData);

export default router;
