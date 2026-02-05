import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { getBankTransfers } from "../../controllers/serviceman/bankTransfer.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getBankTransfers);

export default router;
