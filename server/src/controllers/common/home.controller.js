import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import CategoryModel from "../../models/category.model.js";
import { getCartData } from "../../utils/cart.utils.js";

// Get home page data
export const getHomePageData = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized: User not found");
  };

  // Fetch active categories
  const categories = await CategoryModel
    .find({ status: true })
    .sort({ createdAt: -1 })
    .lean();

  // Fetch user's cart data
  let cart = await getCartData(userId);

  return res.status(200).json({
    success: true,
    data: {
      category: categories,
      cart: cart,
    },
  });
});
