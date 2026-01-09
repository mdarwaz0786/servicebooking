import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import {
  createPincode,
  deletePincode,
  getPincodeById,
  getPincodes,
  updatePincode
} from "../../controllers/admin/pincode.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createPincode);
router.get("/", isLoggedIn, getPincodes);
router.get("/:id", isLoggedIn, getPincodeById);
router.patch("/:id", isLoggedIn, updatePincode);
router.delete("/:id", isLoggedIn, deletePincode);

export default router;
