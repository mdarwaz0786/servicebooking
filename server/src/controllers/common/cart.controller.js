import CartModel from "../../models/cart.model.js";
import ServiceModel from "../../models/service.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { getCartData } from "../../utils/cart.utils.js";

// Create or Add to Cart
export const addToCart = asyncHandler(async (req, res) => {
  const { serviceId, quantity = 1, userId = "" } = req.body;

  if (!serviceId) {
    throw new ApiError(400, "Service ID is required");
  };

  const service = await ServiceModel.findById(serviceId).select("categoryId");

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  const resolvedUserId = req.user?._id ? req.user._id : userId;

  let cartItems = await CartModel.find({ userId: resolvedUserId });

  let message;

  if (cartItems.length > 0) {
    const existingCategoryId = cartItems[0]?.categoryId?.toString();

    if (existingCategoryId !== service?.categoryId?.toString()) {
      await CartModel.deleteMany({
        userId: resolvedUserId,
        categoryId: existingCategoryId,
      });
    };
    message = "Your previous category service is removed from cart";
  };

  let cartItem = await CartModel.findOne({ serviceId, userId: resolvedUserId });

  if (cartItem) {
    if (quantity == 0) {
      await cartItem.deleteOne();
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
    };
  } else {
    cartItem = await CartModel.create({
      serviceId,
      categoryId: service?.categoryId,
      userId: resolvedUserId,
      quantity,
    });
  };

  await cartItem.populate("serviceId");

  const reponseData = await getCartData(resolvedUserId);

  return res.status(201).json({ success: true, message: message ? message : "Added To Cart", data: reponseData });
});

// Get cart items
export const getCartItems = asyncHandler(async (req, res) => {
  let { userId = '' } = req.query;
  const cartItems = await CartModel
    .find({ userId: req.user?._id ? req.user?._id : userId })
    .populate({
      path: "serviceId",
      populate: {
        path: "categoryId",
        options: { strictPopulate: false },
        populate: {
          path: "subcategories",
          options: { strictPopulate: false },
          populate: {
            path: "subSubCategories",
            options: { strictPopulate: false },
            populate: {
              path: "subSubSubCategories",
              options: { strictPopulate: false },
            },
          },
        },
      },
    });

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: cartItems });
});

// Update cart item quantity
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cartItem = await CartModel.findOne({ _id: req.params.id, userId: req.user?._id });
  if (!cartItem) {
    throw new ApiError(404, "Cart item not found");
  };

  cartItem.quantity = quantity;
  cartItem.updatedBy = req.user?._id;
  await cartItem.save();

  return res.status(200).json({ success: true, message: "Quantity updated successfully", data: cartItem });
});

// Remove cart item
export const removeCartItem = asyncHandler(async (req, res) => {
  const cartItem = await CartModel.findOne({ _id: req.params.id, userId: req.user?._id });
  if (!cartItem) {
    throw new ApiError(404, "Cart item not found");
  };

  await cartItem.deleteOne();
  return res.status(200).json({ success: true, message: "Cart item removed successfully" });
});

// Clear cart
export const clearCart = asyncHandler(async (req, res) => {
  await CartModel.deleteMany({ userId: req.user?._id });
  return res.status(200).json({ success: true, message: "Cart cleared successfully" });
});
