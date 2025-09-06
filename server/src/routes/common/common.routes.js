import express from "express";
import addressRoutes from "./address.routes.js";
import cartRoutes from "./cart.routes.js";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import subCategoryRoutes from "./subCategory.routes.js";
import subSubCategoryRoutes from "./subSubCategory.routes.js";
import subSubSubCategoryRoutes from "./subSubSubCategory.routes.js";
import serviceRoutes from "./service.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/sub-category", subCategoryRoutes);
router.use("/sub-sub-category", subSubCategoryRoutes);
router.use("/sub-sub-sub-category", subSubSubCategoryRoutes);
router.use("/service", serviceRoutes);
router.use("/cart", cartRoutes);
router.use("/address", addressRoutes);

export default router;