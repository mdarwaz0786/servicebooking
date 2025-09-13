import express from "express";
import cartRoutes from "./cart.routes.js";
import categoryRoutes from "./category.routes.js";
import subCategoryRoutes from "./subCategory.routes.js";
import subSubCategoryRoutes from "./subSubCategory.routes.js";
import subSubSubCategoryRoutes from "./subSubSubCategory.routes.js";
import serviceRoutes from "./service.routes.js";
import slugRoutes from "./slug.routes.js";
import timeSlotRoutes from "./timeSlot.routes.js";
import homeRoutes from "./home.routes.js";

const router = express.Router();

router.use("/category", categoryRoutes);
router.use("/sub-category", subCategoryRoutes);
router.use("/sub-sub-category", subSubCategoryRoutes);
router.use("/sub-sub-sub-category", subSubSubCategoryRoutes);
router.use("/service", serviceRoutes);
router.use("/cart", cartRoutes);
router.use("/slug", slugRoutes);
router.use("/time-slot", timeSlotRoutes);
router.use("/home", homeRoutes);

export default router;