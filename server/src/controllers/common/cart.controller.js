import CartModel from "../../models/cart.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Create or Add to Cart
export const addToCart = asyncHandler(async (req, res) => {
  const { serviceId, quantity = 1, userId = "" } = req.body;

  if (!serviceId) {
    throw new ApiError(400, "Service ID is required");
  };

  let cartItem = await CartModel.findOne({
    serviceId,
    userId: req.user?._id ? req.user?._id : userId
  });

  if (cartItem) {
    if (quantity == 0) {
      await cartItem.deleteOne();
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
    }
  } else {
    cartItem = await CartModel.create({
      serviceId,
      userId: req.user?._id ? req.user?._id : userId,
      quantity,
    });
  };

  // populate for response
  cartItem = await cartItem.populate("serviceId");

  let cartItems = await CartModel
    .find({ userId: req.user?._id ? req.user?._id : userId })
    .populate("serviceId")
    .lean();

  // flatten serviceId fields but keep serviceId _id
  cartItems = cartItems.map(item => ({
    ...item,
    serviceId: item.serviceId?._id, // keep only the ObjectId
    ...item.serviceId,              // merge service details at top level
  }));

  let rData = {
    cartProducts: cartItems,
    amountData: {
      amount: 100,
      gst: 10,
      payableAmount: 100,
    }
  };

  return res.status(201).json({ success: true, data: rData });
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
