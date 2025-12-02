import asyncHandler from "../../helpers/asyncHandler.js";
import CategoryModel from "../../models/category.model.js";
import CartModel from "../../models/cart.model.js";
import HomePageServiceModel from "../../models/homePageService.model.js";
import HomePageBannerModel from "../../models/homePageBanner.model.js";
import HomePageSliderModel from "../../models/homePageSlider.model.js";
import { getCartData } from "../../utils/cart.utils.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import ServiceModel from "../../models/service.model.js";

// Get home page data
export const getHomePageData = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  // Fetch active categories
  let categories = await CategoryModel
    .find({ status: true })
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: 1 } },
      strictPopulate: false,
      populate: {
        path: "subSubCategories",
        match: { status: true },
        options: { sort: { createdAt: 1 } },
        strictPopulate: false,
        populate: {
          path: "subSubSubCategories",
          match: { status: true },
          options: { sort: { createdAt: 1 } },
          strictPopulate: false,
        }
      }
    })
    .sort({ createdAt: 1 })
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
    .sort({ createdAt: 1 })
    .lean();

  let cartItems = [];
  if (userId) {
    cartItems = await CartModel.find({ userId }).lean();
  }

  const servicesWithQuantity = services?.map((service) => {
    const sid = service?._id?.toString();

    const cartItem = cartItems?.find((item) => item?.serviceId?.toString() === sid);
    const quantity = cartItem ? cartItem?.quantity : 0;

    return {
      ...service,
      quantity,
    };
  });

  // Fetch active home page banners
  const banners = await HomePageBannerModel.find({ status: true })
    .sort({ createdAt: -1 })
    .lean();

  // Fetch active home page sliders
  const sliders = await HomePageSliderModel.find({ status: true })
    .sort({ createdAt: -1 })
    .lean();

  // -------------------- MOST BOOKED SERVICES --------------------
  const mostBookedServicesAgg = await BookingItemModel.aggregate([
    { $group: { _id: "$serviceId", totalBooked: { $sum: "$quantity" } } },
    { $sort: { totalBooked: -1 } },
    { $limit: 5 },
  ]);

  // Populate service details for the aggregated services
  const mostBookedServiceIds = mostBookedServicesAgg.map((item) => item?._id);
  const mostBookedServices = await ServiceModel.find({ _id: { $in: mostBookedServiceIds } })
    .select("name slug image mrpPrice salePrice")
    .lean();

  // Map totalBooked count to service
  const mostBooked = mostBookedServicesAgg.map((item) => {
    const service = mostBookedServices.find((s) => s?._id?.toString() === item?._id?.toString());
    return service ? { ...service, totalBooked: item?.totalBooked } : null;
  }).filter(Boolean);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: {
      category: categories,
      cart: cart,
      services: servicesWithQuantity,
      banners: banners,
      sliders: sliders,
      mostBookedServices: mostBooked,
      customer: 215292,
      serviceCompleted: 90000,
      review: 2390968,
    },
  });
});
