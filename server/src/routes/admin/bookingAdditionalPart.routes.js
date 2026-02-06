import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { updateUnitPrice } from "../../controllers/admin/bookingAdditionlaPart.controller.js";

const router = express.Router();

router.patch(
  "/:id",
  isLoggedIn,
  updateUnitPrice
);

export default router;
