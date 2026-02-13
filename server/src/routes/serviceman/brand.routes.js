import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { getBrands } from "../../controllers/serviceman/brand.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getBrands);

export default router;
