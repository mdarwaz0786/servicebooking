import express from "express";
import {
  createServiceFaq,
  getServiceFaqs,
  getServiceFaqById,
  updateServiceFaq,
  deleteServiceFaq,
} from "../../controllers/admin/serviceFaq.controller.js";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createServiceFaq);
router.get("/", isLoggedIn, getServiceFaqs);
router.get("/:id", isLoggedIn, getServiceFaqById);
router.patch("/:id", isLoggedIn, updateServiceFaq);
router.delete("/:id", isLoggedIn, deleteServiceFaq);

export default router;
