import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  getInvoiceById,
  getInvoices
} from "../../controllers/admin/invoice.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getInvoices);
router.get("/:id", isLoggedIn, getInvoiceById);

export default router;
