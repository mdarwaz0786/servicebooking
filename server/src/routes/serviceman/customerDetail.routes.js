import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { getCustomerDetail } from "../../controllers/serviceman/customerDetail.controller.js";

const router = express.Router();

router.get("/:id", isLoggedIn, getCustomerDetail);

export default router;
