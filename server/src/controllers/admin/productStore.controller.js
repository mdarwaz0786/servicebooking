import ProductStoreModel from "../../models/productStore.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import { buildPagination } from "../../utils/pagination.js";
import compressImage from "../../helpers/compressImage.js";

export const createProductStore = asyncHandler(async (req, res) => {
  const { name, stock, price, brandId, partType } = req.body;

  if (!name || !name.trim()) throw new ApiError(400, "Product name is required");
  if (!stock && stock !== 0) throw new ApiError(400, "Stock is required");
  if (!price && price !== 0) throw new ApiError(400, "Price is required");
  if (!brandId) throw new ApiError(400, "Brand ID is required");

  let imagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "productStore");
    };

    let product = await ProductStoreModel.create({
      name,
      stock,
      price,
      brandId,
      partType,
      image: imagePath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(name, "ProductStore", product._id, "product-stores");
    product.slug = slug;
    await product.save();

    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getProductStores = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  let sortOption = {};
  sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const products = await ProductStoreModel.find(filters)
    .populate("brandId")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ProductStoreModel.countDocuments(filters);
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
    data: products,
    pagination: buildPagination({ page, limit, total })
  });
});

export const getProductStoreById = asyncHandler(async (req, res) => {
  const product = await ProductStoreModel.findById(req.params.id).populate("brandId");

  if (!product) throw new ApiError(404, "Product not found");

  return res.status(200).json({ success: true, data: product });
});

export const updateProductStore = asyncHandler(async (req, res) => {
  const { name, stock, price, brandId, partType, status } = req.body;

  const product = await ProductStoreModel.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  if (name && name !== product.name) {
    await SlugModel.deleteOne({
      collectionName: "ProductStore",
      documentId: product._id
    });

    const newSlug = await generateUniqueSlug(name, "ProductStore", product._id, "product-stores");
    product.slug = newSlug;
  }

  if (req.files?.image?.[0]) {
    if (product.image && fs.existsSync(path.join(process.cwd(), product.image))) {
      fs.unlinkSync(path.join(process.cwd(), product.image));
    };
    product.image = await compressImage(req.files.image[0].buffer, "productStore");
  };

  product.name = name !== undefined ? name : product.name;
  product.stock = stock !== undefined ? stock : product.stock;
  product.price = price !== undefined ? price : product.price;
  product.brandId = brandId !== undefined ? brandId : product.brandId;
  product.partType = partType !== undefined ? partType : product.partType;
  product.status = typeof status === "boolean" ? status : product.status;
  product.updatedBy = req.user?._id;
  product.updatedAt = new Date();

  await product.save();

  return res.status(200).json({ success: true, data: product });
});

export const deleteProductStore = asyncHandler(async (req, res) => {
  const product = await ProductStoreModel.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  await SlugModel.deleteOne({
    collectionName: "ProductStore",
    documentId: product._id
  });

  await product.deleteOne();

  return res.status(200).json({ success: true, message: "Product deleted successfully" });
});
