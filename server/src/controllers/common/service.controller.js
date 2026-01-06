import ServiceModel from "../../models/service.model.js";
import CategoryModel from "../../models/category.model.js";
import CartModel from "../../models/cart.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import SubSubCategoryModel from "../../models/subSubCategory.model.js";
import SubSubSubCategoryModel from "../../models/subSubSubCategory.model.js";
import SlugModel from "../../models/slug.model.js";
import ReviewModel from "../../models/review.model.js";
import BookingItemModel from "../../models/bookingItem.model.js";
import RateCardModel from "../../models/rateCard.model.js"; // 🔹 Added
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Helper function to remove services
const removeServices = (doc) => {
  if (!doc) return;
  if (Array.isArray(doc)) {
    doc?.forEach((d) => {
      if (d?.services) {
        d.services = undefined;
      }
    });
  } else {
    if (doc?.services) {
      doc.services = undefined;
    }
  }
};

// ==================== GET ALL SERVICES ====================
export const getServices = asyncHandler(async (req, res) => {
  let { search, sort = "-createdAt", page, limit, slug, userId = "", categoryId, subCategoryId, subSubCategoryId, subSubSubCategoryId } = req.query;
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;

  if (isNaN(page) || isNaN(limit)) {
    return res.status(400).json({
      success: false,
      message: "page & limit must be valid numbers"
    });
  }

  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  filters.status = true;

  if (categoryId) filters.categoryId = categoryId;
  if (subCategoryId) filters.subCategoryId = subCategoryId;
  if (subSubCategoryId) filters.subSubCategoryId = subSubCategoryId;
  if (subSubSubCategoryId) filters.subSubSubCategoryId = subSubSubCategoryId;

  let data, name, categoryList;

  if (slug) {
    const slugData = await SlugModel.findOne({ slug });

    if (!slugData) {
      return res.status(404).json({
        success: false,
        message: `No resource found for slug: ${slug}`,
      });
    }

    if (slugData.collectionName === "Category") {
      filters.categoryId = slugData.documentId;
      data = await CategoryModel.findById(slugData.documentId);
      categoryList = await SubCategoryModel.find({ categoryId: data._id, status: true });
      name = data.name;
    } else if (slugData.collectionName === "SubCategory") {
      filters.subCategoryId = slugData.documentId;
      data = await SubCategoryModel.findById(slugData.documentId);
      categoryList = await SubSubCategoryModel.find({ subCategoryId: data._id, status: true });
      name = data.name;
    } else if (slugData.collectionName === "SubSubCategory") {
      filters.subSubCategoryId = slugData.documentId;
      data = await SubSubCategoryModel.findById(slugData.documentId);
      categoryList = await SubSubSubCategoryModel.find({ subSubCategoryId: data._id, status: true });
      name = data.name;
    } else if (slugData.collectionName === "SubSubSubCategory") {
      filters.subSubSubCategoryId = slugData.documentId;
      data = await SubSubSubCategoryModel.findById({ _id: slugData.documentId, status: true });
      name = data.name;
    } else if (slugData.collectionName === "Service") {
      filters._id = slugData.documentId;
      data = await ServiceModel.findById({ _id: slugData.documentId, status: true });
      name = data.name;
    }
  }

  const services = await ServiceModel.aggregate([
    { $match: filters },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },
    {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryId",
        foreignField: "_id",
        as: "subCategory"
      }
    },
    { $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "subsubcategories",
        localField: "subSubCategoryId",
        foreignField: "_id",
        as: "subSubCategory"
      }
    },
    { $unwind: { path: "$subSubCategory", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "subsubsubcategories",
        localField: "subSubSubCategoryId",
        foreignField: "_id",
        as: "subSubSubCategory"
      }
    },
    { $unwind: { path: "$subSubSubCategory", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        "category.status": true,
        $and: [
          { $or: [{ subCategory: null }, { "subCategory.status": true }] },
          { $or: [{ subSubCategory: null }, { "subSubCategory.status": true }] },
          { $or: [{ subSubSubCategory: null }, { "subSubSubCategory.status": true }] }
        ]
      }
    },

    { $sort: sort === "-createdAt" ? { createdAt: 1 } : { createdAt: 1 } },
    { $skip: skip },
    { $limit: limit }
  ]);

  const serviceIds = services.map((s) => s?._id);

  let cartItems = [];
  if (userId) {
    cartItems = await CartModel.find({ userId }).lean();
  }

  const bookingItems = await BookingItemModel.find({ serviceId: { $in: serviceIds } }).select("serviceId bookingId");
  const serviceToBookingIds = {};
  bookingItems.forEach((b) => {
    const sid = b?.serviceId?.toString();
    if (!serviceToBookingIds[sid]) {
      serviceToBookingIds[sid] = [];
    }
    serviceToBookingIds[sid].push(b?.bookingId);
  });

  const allBookingIds = bookingItems.map((b) => b?.bookingId);
  const reviews = await ReviewModel.find({ bookingId: { $in: allBookingIds }, status: true, type: 1 }).select("bookingId rating");

  const bookingRatings = {};
  reviews.forEach((r) => (bookingRatings[r?.bookingId?.toString()] = r?.rating));

  const servicesWithRatings = await Promise.all(
    services.map(async (service) => {
      const sid = service?._id?.toString();

      let rateCard = null;

      if (service.subCategoryId) {
        rateCard = await RateCardModel.findOne({
          subCategory: service.subCategoryId,
        })
          .populate("category subCategory")
          .lean();
      } else {
        rateCard = await RateCardModel.findOne({
          category: service.categoryId,
        })
          .populate("category subCategory")
          .lean();
      }

      const bookingIds = serviceToBookingIds[sid] || [];
      let sum = 0;
      let count = 0;

      bookingIds.forEach((bid) => {
        const rating = bookingRatings[bid?.toString()];
        if (rating) {
          sum += rating;
          count++;
        }
      });

      const averageRating = count > 0 ? Number((sum / count).toFixed(1)) : 0;
      const cartItem = cartItems?.find((item) => item?.serviceId?.toString() === sid);
      const quantity = cartItem ? cartItem?.quantity : 0;

      return {
        ...service,
        ratings: {
          totalRatings: count,
          averageRating,
        },
        quantity,
        rateCard: rateCard || null,
      };
    })
  );

  const total = await ServiceModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    slug,
    name,
    categoryList: categoryList,
    data: servicesWithRatings,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ==================== GET SINGLE SERVICE ====================
export const getServiceById = asyncHandler(async (req, res) => {
  const serviceId = req.params.id;
  let { userId = "" } = req.query;

  const service = await ServiceModel.findById(serviceId)
    .populate("serviceIncluded requirementFromCustomer whyChooseUs expertTechnician brandLogo gIPromise serviceFaq")
    .lean();

  if (!service) throw new ApiError(404, "Service not found");

  let rateCard = null;

  if (service.subCategoryId) {
    rateCard = await RateCardModel.findOne({
      subCategory: service.subCategoryId
    })
      .populate("category subCategory")
      .lean();
  } else {
    rateCard = await RateCardModel.findOne({
      category: service.categoryId
    })
      .populate("category subCategory")
      .lean();
  }

  removeServices(service?.serviceIncluded);
  removeServices(service?.requirementFromCustomer);
  removeServices(service?.whyChooseUs);
  removeServices(service?.expertTechnician);
  removeServices(service?.brandLogo);
  removeServices(service?.gIPromise);
  removeServices(service?.serviceFaq);

  const bookingItems = await BookingItemModel.find({ serviceId }).select("bookingId");
  const bookingIds = bookingItems.map((b) => b?.bookingId);

  const ratingStats = await ReviewModel.aggregate([
    { $match: { bookingId: { $in: bookingIds }, status: true, type: 1 } },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
  ]);

  const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRatings = 0;
  let sumRatings = 0;

  ratingStats.forEach((item) => {
    ratingCount[item?._id] = item?.count;
    totalRatings += item?.count;
    sumRatings += item?._id * item?.count;
  });

  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;

  const latestReviews = await ReviewModel
    .find({ bookingId: { $in: bookingIds }, status: true, type: 1 })
    .select("rating description userId createdAt updatedAt")
    .populate("user", "-password -role -createdAt -updatedAt")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  let cartItems = [];
  if (userId) {
    cartItems = await CartModel.find({ userId }).lean();
  }
  const cartItem = cartItems?.find((item) => item?.serviceId?.toString() === serviceId);
  const quantity = cartItem ? cartItem?.quantity : 0;

  service.ratings = {
    ratingCount,
    totalRatings,
    averageRating: Number(averageRating),
    latestReviews,
  };
  service.quantity = quantity;

  service.rateCard = rateCard;

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: service,
  });
});
