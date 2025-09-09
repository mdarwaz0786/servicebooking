import CartModel from "../../models/cart.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Create or Add to Cart
export const addToCart = asyncHandler(async (req, res) => {
  const { serviceId, quantity = 1 } = req.body;

  if (!serviceId) {
    throw new ApiError(400, "Service ID is required");
  };

  let cartItem = await CartModel.findOne({ serviceId, userId: req.user?._id });

  if (cartItem) {
    cartItem.quantity += quantity;
    cartItem.updatedBy = req.user?._id;
    await cartItem.save();
  } else {
    cartItem = await CartModel.create({
      serviceId,
      userId: req.user?._id,
      quantity,
      createdBy: req.user?._id,
    });
  };

  cartItem = await cartItem.populate("serviceId");

  return res.status(201).json({ success: true, data: cartItem });
});

// Get cart items
export const getCartItems = asyncHandler(async (req, res) => {
  const cartItems = await CartModel
    .find({ userId: req.user?._id })
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

  return res.status(200).json({ success: true, data: cartItems });
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

  return res.status(200).json({ success: true, data: cartItem });
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
