import CartModel from "../models/cart.model.js";

export const getCartData = async (userId) => {
  let cartItems = await CartModel
    .find({ userId })
    .populate("serviceId")
    .lean();

  cartItems = cartItems.map((item) => ({
    ...item,
    serviceId: item.serviceId?._id,
    ...item.serviceId,
  }));

  return {
    cartProducts: cartItems,
    amountData: {
      amount: 100,
      gst: 10,
      payableAmount: 100,
    },
  };
};
