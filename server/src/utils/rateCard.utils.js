export const calculateServicePrice = (serviceCharge = {}) => {
  const price = Number(serviceCharge.price) || 0;
  const discount = Number(serviceCharge.discountPrice) || 0;
  const labour = Number(serviceCharge.labourCharge) || 0;

  let finalPrice = 0;
  let finalDiscount = 0;
  let finalLabour = 0;

  if (price > 0) {
    finalPrice = price;
    if (discount < 1) {
      finalDiscount = price;
    }
  } else {
    finalDiscount = discount;
  }

  if (discount > 0 && price > 0) {
    finalDiscount = price - discount - labour;
  }

  if (labour > 0) {
    finalLabour = labour;
  }

  return {
    finalPrice,
    finalDiscount: finalDiscount > 0 ? finalDiscount : 0,
    finalLabour,
    hasDiscount: finalPrice > 0 && discount > 0,
  };
};
