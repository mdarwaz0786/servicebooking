import ServiceModel from "../../models/service.model.js";
import CategoryModel from "../../models/category.model.js";
import CartModel from "../../models/cart.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import SubSubCategoryModel from "../../models/subSubCategory.model.js";
import SubSubSubCategoryModel from "../../models/subSubSubCategory.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Helper to remove `services` from populated virtual
const removeServices = (doc) => {
  if (!doc) return;
  if (Array.isArray(doc)) {
    doc.forEach(d => { if (d.services) d.services = undefined; });
  } else {
    if (doc.services) doc.services = undefined;
  };
};

// Get all services
export const getServices = asyncHandler(async (req, res) => {
  let { search, status, sort = "-createdAt", page = 1, limit = 10, slug, userId = "", categoryId, subCategoryId, subSubCategoryId, subSubSubCategoryId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  if (status !== undefined) filters.status = status === "true";

  if (categoryId) {
    filters.categoryId = categoryId;
  };

  if (subCategoryId) {
    filters.subCategoryId = subCategoryId;
  };

  if (subSubCategoryId) {
    filters.subSubCategoryId = subSubCategoryId;
  };

  if (subSubSubCategoryId) {
    filters.subSubSubCategoryId = subSubSubCategoryId;
  };

  let data, name, categoryList;

  if (slug) {
    const slugData = await SlugModel.findOne({ slug });

    if (!slugData) {
      return res.status(404).json({
        success: false,
        message: `No resource found for slug: ${slug}`,
      });
    };

    if (slugData.collectionName === "Category") {
      filters.categoryId = slugData.documentId;
      data = await CategoryModel.findById(slugData.documentId);
      categoryList = await SubCategoryModel.find({ categoryId: data._id });
      name = data.name;
    } else if (slugData.collectionName === "SubCategory") {
      filters.subCategoryId = slugData.documentId;
      data = await SubCategoryModel.findById(slugData.documentId);
      categoryList = await SubSubCategoryModel.find({ subCategoryId: data._id });
      name = data.name;
    } else if (slugData.collectionName === "SubSubCategory") {
      filters.subSubCategoryId = slugData.documentId;
      data = await SubSubCategoryModel.findById(slugData.documentId);
      categoryList = await SubSubSubCategoryModel.find({ subSubCategoryId: data._id });
      name = data.name;
    } else if (slugData.collectionName === "SubSubSubCategory") {
      filters.subSubSubCategoryId = slugData.documentId;
      data = await SubSubSubCategoryModel.findById(slugData.documentId);
      name = data.name;
    } else if (slugData.collectionName === "Service") {
      filters._id = slugData.documentId;
      data = await ServiceModel.findById(slugData.documentId);
      name = data.name;
    };
  };

  const services = await ServiceModel
    .find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

  let cartItems = [];

  if (userId) {
    cartItems = await CartModel.find({ userId }).lean();
  };

  const servicesWithQty = services.map((service) => {
    const cartItem = cartItems.find((item) => item.serviceId.toString() === service._id.toString());
    return {
      ...service,
      quantity: cartItem ? cartItem.quantity : 0,
    };
  });

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
    data: servicesWithQty,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get single service
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id).populate("serviceIncluded requirementFromCustomer whyChooseUs expertTechnician brandLogo gIPromise").lean();

  removeServices(service.serviceIncluded);
  removeServices(service.requirementFromCustomer);
  removeServices(service.whyChooseUs);
  removeServices(service.expertTechnician);
  removeServices(service.brandLogo);
  removeServices(service.gIPromise);

  if (!service) throw new ApiError(404, "Service not found");
  return res.status(200).json({ success: true, message: "Data fetched successfully", data: service });
});