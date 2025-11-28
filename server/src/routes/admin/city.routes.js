import express from "express";
import {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
} from "../../controllers/admin/city.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createCity);
router.get("/", isLoggedIn, getCities);
router.get("/:id", isLoggedIn, getCityById);
router.patch("/:id", isLoggedIn, updateCity);
router.delete("/:id", isLoggedIn, deleteCity);

export default router;
