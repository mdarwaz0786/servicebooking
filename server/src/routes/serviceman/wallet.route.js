import express from "express";
import isLoggedIn from "../../middlewares/serviceman/auth.middleware.js";
import { createWallet, getWallets } from "../../controllers/serviceman/wallet.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createWallet);
router.get("/", isLoggedIn, getWallets);

export default router;
