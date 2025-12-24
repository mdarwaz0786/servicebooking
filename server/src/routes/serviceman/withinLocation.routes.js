import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { checkServicemanNearby } from "../../controllers/serviceman/withinLocation.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, checkServicemanNearby);

export default router;
