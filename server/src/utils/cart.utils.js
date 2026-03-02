import CartModel from "../models/cart.model.js";

export const getCartData = async (userId) => {
  let cartItems = await CartModel
    .find({ userId })
    .populate("serviceId")
    .lean();

  cartItems = cartItems.map((item) => ({
    ...item,
    serviceId: item?.serviceId?._id,
    ...(item.serviceId || {}),
  }));

  let amount = 0;
  let mrpAmount = 0;

  let gstAmount = 0;
  let discountAmount = 0;
  let payableAmount = 0;
  let taxablePrice = 0;
  let transactionCharge = 0;
  let taxPercent = 0;

  cartItems.forEach((item) => {
    amount += Number(item?.salePrice || 0) * Number(item?.quantity || 1);
    mrpAmount += Number(item?.mrpPrice || 0) * Number(item?.quantity || 1);

    taxablePrice += Number(item?.taxablePrice || 0);
    transactionCharge += Number(item?.transactionCharge || 0);
    taxPercent += Number(item?.taxPercent || 0);
  });

  payableAmount = amount;
  gstAmount += (transactionCharge + taxablePrice) * 18 / 100;
  payableAmount += gstAmount;

  payableAmount -= discountAmount;

  return {
    cartProducts: cartItems,
    amountData: {
      amount: amount,
      mrpAmount: mrpAmount,
      gstAmount: gstAmount,
      gstPercent: 18,
      discountAmount: discountAmount,
      payableAmount: payableAmount,
    },
  };
};
