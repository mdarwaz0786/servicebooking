import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { dashboard } from "../../controllers/serviceman/dashboard.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, dashboard);

export default router;
