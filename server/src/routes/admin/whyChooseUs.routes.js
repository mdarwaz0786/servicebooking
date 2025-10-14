import express from "express"
import {
  createWhyChooseUs,
  deleteWhyChooseUs,
  getWhyChooseUsById,
  getWhyChooseUsList,
  updateWhyChooseUs
} from "../../controllers/admin/whyChooseUs.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js"

const router = express.Router()
router.post("/", isLoggedIn, createWhyChooseUs)
router.get("/", isLoggedIn, getWhyChooseUsList)
router.get("/:id", isLoggedIn, getWhyChooseUsById)
router.patch("/:id", isLoggedIn, updateWhyChooseUs)
router.delete("/:id", isLoggedIn, deleteWhyChooseUs)

export default router;
