import express from "express"
import isLoggedIn from "../../middlewares/admin/auth.middleware.js"
import {
  createServiceIncluded,
  getServiceIncludedList,
  getServiceIncludedById,
  updateServiceIncluded,
  deleteServiceIncluded,
} from "../../controllers/admin/serviceIncluded.controller.js"

const router = express.Router()

router.post("/", isLoggedIn, createServiceIncluded)
router.get("/", isLoggedIn, getServiceIncludedList)
router.get("/:id", isLoggedIn, getServiceIncludedById)
router.patch("/:id", isLoggedIn, updateServiceIncluded)
router.delete("/:id", isLoggedIn, deleteServiceIncluded)

export default router
