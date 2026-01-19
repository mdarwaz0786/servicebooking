import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createScanAndPayQr = async ({
  amount,
  referenceId,
  customerId,
  description = "Scan & Pay",
}) => {
  const qr = await razorpay.qrCode.create({
    type: "upi_qr",
    name: referenceId,
    usage: "single_use",
    fixed_amount: true,
    payment_amount: amount * 100,
    description,
    customer_id: customerId?.toString(),
  });

  return qr;
};
