import asyncHandler from "../../helpers/asyncHandler.js";
import CategoryModel from "../../models/category.model.js";
import CartModel from "../../models/cart.model.js";
import HomePageServiceModel from "../../models/homePageService.model.js";
import HomePageBannerModel from "../../models/homePageBanner.model.js";
import HomePageSliderModel from "../../models/homePageSlider.model.js";
import { getCartData } from "../../utils/cart.utils.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import ServiceModel from "../../models/service.model.js";

const buildCountMap = ({ list = [], services = [], key }) => {
  const countMap = {};
  const slugMap = {};

  // 1️⃣ Build slugMap from populated list
  list.forEach((item) => {
    slugMap[item._id.toString()] = item.slug;
  });

  // 2️⃣ Count services + fallback slug from populated ref
  services.forEach((service) => {
    const id = service?.[key]?.toString();
    if (!id) return;

    countMap[id] = (countMap[id] || 0) + 1;

    // 🛡 fallback if slug missing
    if (!slugMap[id] && service[key]?.slug) {
      slugMap[id] = service[key].slug;
    }
  });

  return { countMap, slugMap };
};

// Most booked count map
export const buildCountMapMostBooked = ({ services = [], key }) => {
  const countMap = {};
  const slugMap = {};

  services.forEach((service) => {
    const ref = service?.[key];
    if (!ref) return;

    // ✅ works for populated + unpopulated refs
    const id =
      typeof ref === "object"
        ? ref?._id?.toString()
        : ref?.toString();

    if (!id) return;

    countMap[id] = (countMap[id] ?? 0) + 1;

    // ✅ slug from populated object
    if (typeof ref === "object" && ref.slug) {
      slugMap[id] = ref.slug;
    }
  });

  return { countMap, slugMap };
};

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
    .populate({
      path: "services",
      select: "name image slug mrpPrice salePrice categoryId subCategoryId subSubCategoryId subSubSubCategoryId",
      populate: [
        { path: "categoryId", strictPopulate: false, select: "slug" },
        { path: "subCategoryId", strictPopulate: false, select: "slug" },
        { path: "subSubCategoryId", strictPopulate: false, select: "slug" },
        { path: "subSubSubCategoryId", strictPopulate: false, select: "slug" },
      ],
    })
    .sort({ createdAt: 1 })
    .lean();

  let cartItems = [];
  if (userId) {
    cartItems = await CartModel.find({ userId }).lean();
  }

  const servicesWithQuantity = services.map((serviceBlock) => {

    // 1️⃣ Add quantity first
    const baseServices = serviceBlock.services.map((s) => {
      const cartItem = cartItems.find(
        (item) => item?.serviceId?.toString() === s?._id?.toString()
      );

      return {
        ...s,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });

    // 2️⃣ Build maps
    const categoryMap = buildCountMap({
      list: serviceBlock.category,
      services: baseServices,
      key: "categoryId",
    });

    const subCategoryMap = buildCountMap({
      list: serviceBlock.subCategory,
      services: baseServices,
      key: "subCategoryId",
    });

    const subSubCategoryMap = buildCountMap({
      list: serviceBlock.subSubCategory,
      services: baseServices,
      key: "subSubCategoryId",
    });

    const subSubSubCategoryMap = buildCountMap({
      list: serviceBlock.subSubSubCategory,
      services: baseServices,
      key: "subSubSubCategoryId",
    });

    // 3️⃣ Inject count & slug INTO each service
    const updatedServices = baseServices.map((service) => {
      const categoryId = service?.categoryId?.toString();
      const subCategoryId = service?.subCategoryId?.toString();
      const subSubCategoryId = service?.subSubCategoryId?.toString();
      const subSubSubCategoryId = service?.subSubSubCategoryId?.toString();

      return {
        ...service,

        categorySlug: service?.categoryId?.slug || null,
        categoryCount: categoryMap.countMap[categoryId] || 0,

        subCategorySlug: service?.subCategoryId?.slug || null,
        subCategoryCount: subCategoryMap.countMap[subCategoryId] || 0,

        subSubCategorySlug: service?.subSubCategoryId?.slug || null,
        subSubCategoryCount: subSubCategoryMap.countMap[subSubCategoryId] || 0,

        subSubSubCategorySlug: service?.subSubSubCategoryId?.slug || null,
        subSubSubCategoryCount: subSubSubCategoryMap.countMap[subSubSubCategoryId] || 0,
      };
    });

    // 4️⃣ Final response
    return {
      ...serviceBlock,
      services: updatedServices,
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
    .select(
      "name slug image mrpPrice salePrice categoryId subCategoryId subSubCategoryId subSubSubCategoryId"
    )
    .populate([
      { path: "categoryId", select: "slug", strictPopulate: false },
      { path: "subCategoryId", select: "slug", strictPopulate: false },
      { path: "subSubCategoryId", select: "slug", strictPopulate: false },
      { path: "subSubSubCategoryId", select: "slug", strictPopulate: false },
    ])
    .lean();

  const categoryMap = buildCountMapMostBooked({
    services: mostBookedServices,
    key: "categoryId",
  });

  const subCategoryMap = buildCountMapMostBooked({
    services: mostBookedServices,
    key: "subCategoryId",
  });

  const subSubCategoryMap = buildCountMapMostBooked({
    services: mostBookedServices,
    key: "subSubCategoryId",
  });

  const subSubSubCategoryMap = buildCountMapMostBooked({
    services: mostBookedServices,
    key: "subSubSubCategoryId",
  });

  // Map totalBooked count to service
  const mostBooked = mostBookedServicesAgg.map((item) => {
    const service = mostBookedServices.find((s) => s?._id?.toString() === item?._id?.toString());

    const cartItem = cartItems.find(
      (c) => c.serviceId?.toString() === item._id.toString()
    );

    const categoryId = service?.categoryId?._id?.toString();
    const subCategoryId = service?.subCategoryId?._id?.toString();
    const subSubCategoryId = service?.subSubCategoryId?._id?.toString();
    const subSubSubCategoryId = service?.subSubSubCategoryId?._id?.toString();

    return service ? {
      ...service,
      totalBooked: item?.totalBooked,
      quantity: cartItem ? cartItem.quantity : 0,

      // CATEGORY
      categoryId: categoryId || null,
      categorySlug: categoryId ? categoryMap.slugMap[categoryId] || null : null,
      categoryCount: categoryId ? categoryMap.countMap[categoryId] || 0 : 0,

      // SUB CATEGORY
      subCategoryId: subCategoryId || null,
      subCategorySlug: subCategoryId
        ? subCategoryMap.slugMap[subCategoryId] || null
        : null,
      subCategoryCount: subCategoryId
        ? subCategoryMap.countMap[subCategoryId] || 0
        : 0,

      // SUB SUB CATEGORY
      subSubCategoryId: subSubCategoryId || null,
      subSubCategorySlug: subSubCategoryId
        ? subSubCategoryMap.slugMap[subSubCategoryId] || null
        : null,
      subSubCategoryCount: subSubCategoryId
        ? subSubCategoryMap.countMap[subSubCategoryId] || 0
        : 0,

      // SUB SUB SUB CATEGORY
      subSubSubCategoryId: subSubSubCategoryId || null,
      subSubSubCategorySlug: subSubSubCategoryId
        ? subSubSubCategoryMap.slugMap[subSubSubCategoryId] || null
        : null,
      subSubSubCategoryCount: subSubSubCategoryId
        ? subSubSubCategoryMap.countMap[subSubSubCategoryId] || 0
        : 0,
    } : null;
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
