import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { getMonthWiseEarningWithBankTransfer } from "../../controllers/serviceman/bankTransfer.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getMonthWiseEarningWithBankTransfer);

export default router;
