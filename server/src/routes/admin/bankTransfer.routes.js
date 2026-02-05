import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createBankTransfer } from "../../controllers/admin/bankTransfer.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createBankTransfer);

export default router;
