import express from "express";
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";
import { createCashCollectedSubmit, getCashCollectedSubmitById, getCashCollectedSubmitList } from "../../controllers/admin/cashCollectedSubmit.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, createCashCollectedSubmit);
router.get("/", isLoggedIn, getCashCollectedSubmitList);
router.get("/:id", isLoggedIn, getCashCollectedSubmitById);

export default router;
