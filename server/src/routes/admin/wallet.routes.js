import express from "express";
import {
  createWallet,
  getWallets,
  getWalletById,
  updateWallet,
  deleteWallet
} from "../../controllers/admin/wallet.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createWallet);
router.get("/", isLoggedIn, getWallets);
router.get("/:id", isLoggedIn, getWalletById);
router.patch("/:id", isLoggedIn, updateWallet);
router.delete("/:id", isLoggedIn, deleteWallet);

export default router;
