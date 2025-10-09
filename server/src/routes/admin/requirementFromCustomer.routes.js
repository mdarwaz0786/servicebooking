import express from "express"
import isLoggedIn from "../../middlewares/admin/auth.middleware.js"
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js"
import {
  createRequirementFromCustomer,
  getRequirementsFromCustomer,
  getRequirementFromCustomerById,
  updateRequirementFromCustomer,
  deleteRequirementFromCustomer
} from "../../controllers/admin/requirementFromCustomer.controller.js"

const router = express.Router()

router.post(
  "/",
  isLoggedIn,
  upload.fields([
    { name: "icons", maxCount: 10 },
  ]),
  validateFileSize,
  createRequirementFromCustomer
);
router.get("/", isLoggedIn, getRequirementsFromCustomer);
router.get("/:id", isLoggedIn, getRequirementFromCustomerById);
router.patch(
  "/:id",
  isLoggedIn,
  upload.fields([
    { name: "icons", maxCount: 10 },
  ]),
  validateFileSize,
  updateRequirementFromCustomer
);
router.delete("/:id", isLoggedIn, deleteRequirementFromCustomer);

export default router;
