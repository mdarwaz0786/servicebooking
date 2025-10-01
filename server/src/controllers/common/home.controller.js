import asyncHandler from "../../helpers/asyncHandler.js";
import CategoryModel from "../../models/category.model.js";
import HomePageServiceModel from "../../models/homePageService.model.js";
import HomePageBannerModel from "../../models/homePageBanner.model.js";
import HomePageSliderModel from "../../models/homePageSlider.model.js";
import { getCartData } from "../../utils/cart.utils.js";

// Get home page data
export const getHomePageData = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  // Fetch active categories
  let categories = await CategoryModel
    .find({ status: true })
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: -1 } },
      strictPopulate: false,
      populate: {
        path: "subSubCategories",
        match: { status: true },
        options: { sort: { createdAt: -1 } },
        strictPopulate: false,
        populate: {
          path: "subSubSubCategories",
          match: { status: true },
          options: { sort: { createdAt: -1 } },
          strictPopulate: false,
        }
      }
    })
    .sort({ createdAt: -1 })
    .lean();

  categories = categories.map((cat) => {
    const subCategoryCount = cat.subcategories?.length || 0;

    const subSubCategoryCount = cat.subcategories?.reduce((acc, sub) => {
      return acc + (sub.subSubCategories?.length || 0);
    }, 0) || 0;

    const subSubSubCategoryCount = cat.subcategories?.reduce((acc1, sub) => {
      return acc1 + (sub.subSubCategories?.reduce((acc2, subsub) => {
        return acc2 + (subsub.subSubSubCategories?.length || 0);
      }, 0));
    }, 0) || 0;

    return {
      ...cat,
      subCategoryCount,
      subSubCategoryCount,
      subSubSubCategoryCount
    };
  });

  // Fetch user's cart data
  let cart = await getCartData(userId);

  // Fetch active home page services
  const services = await HomePageServiceModel.find({ status: true })
    .populate("services", "name image slug mrpPrice salePrice")
    .sort({ createdAt: -1 })
    .lean();

  // Fetch active home page banners
  const banners = await HomePageBannerModel.find({ status: true })
    .sort({ createdAt: -1 })
    .lean();

  // Fetch active home page sliders
  const sliders = await HomePageSliderModel.find({ status: true })
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: {
      category: categories,
      cart: cart,
      services: services,
      banners: banners,
      sliders: sliders,
      customer: 215292,
      serviceCompleted: 90000,
      review: 2390968,
    },
  });
});
