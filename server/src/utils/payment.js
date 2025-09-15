import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount, receipt = null) => {
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: receipt || `rcpt_${Date.now()}`,
  };
  return await razorpay.orders.create(options);
};

export const verifyRazorpayPayment = (data) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  const sign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  return sign === razorpay_signature;
};
