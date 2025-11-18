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

  let amount = 0;
  let mrpAmount = 0;
  let gst = 10;
  let gstAmount = 0;
  let gstPercent = '18%';
  let discountAmount = 0;
  let payableAmount = 0;

  cartItems.forEach((item) => {
    amount+=item.salePrice*item.quantity;
    mrpAmount+=item.mrpPrice*item.quantity;
  });

  payableAmount = amount;

  gstAmount = amount*gst/100;
  payableAmount+=gstAmount;
  payableAmount-=discountAmount;

  




  return {
    cartProducts: cartItems,
    amountData: {
      amount: amount,
      mrpAmount: mrpAmount,
      gstAmount: gstAmount,
      gstPercent: gstPercent,
      discountAmount: discountAmount,
      payableAmount: payableAmount,
    },
  };
};
