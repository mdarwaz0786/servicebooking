import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createBankTransfer, getEarningAmoutByDateRange } from "../../controllers/admin/bankTransfer.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createBankTransfer);
router.get("/earning-amount-bydate", isLoggedIn, getEarningAmoutByDateRange);

export default router;
