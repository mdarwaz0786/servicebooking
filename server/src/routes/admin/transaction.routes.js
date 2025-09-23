import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  getTransactionById,
  getTransactions,
} from "../../controllers/admin/transaction.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getTransactions);
router.get("/:id", isLoggedIn, getTransactionById);

export default router;
