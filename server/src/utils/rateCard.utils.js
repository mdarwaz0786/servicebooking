export const calculateServicePrice = (serviceCharge = {}) => {
  const price = Number(serviceCharge?.price) || 0;
  const discount = Number(serviceCharge?.discountPrice) || 0;
  const labour = Number(serviceCharge?.labourCharge) || 0;

  let finalPrice = 0;

  if (price > 0) {
    if (discount > 0) {
      finalPrice = (price - discount) - labour;
    } else {
      finalPrice = price;
    };
  } else if (discount > 0) {
    finalPrice = discount;
  } else if (labour > 0) {
    finalPrice = labour;
  };

  if (finalPrice == 0) {
    finalPrice = labour;
  };

  return finalPrice;
};
