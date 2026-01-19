import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createScanAndPayQr = async (
  amount,
  referenceId,
  customerId,
  description = "Scan & Pay",
) => {
  try {
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount for QR code");
    }

    if (!referenceId) {
      throw new Error("referenceId is required for QR code");
    }

    console.log("Creating QR with:", {
      amount,
      referenceId,
      customerId,
      description,
    });

    const qr = await razorpay.qrCode.create({
      type: "upi_qr",
      name: referenceId,
      usage: "single_use",
      fixed_amount: true,
      payment_amount: Math.round(amount * 100),
      description,
      customer_id: customerId?.toString(),
      notes: {
        reference_id: referenceId,
      },
    });

    console.log("QR created successfully:", qr.id);

    return qr;
  } catch (error) {
    console.error(
      "Razorpay QR creation failed:",
      error?.error || error?.message || error
    );
    throw error;
  }
};

export const fetchQrPayments = async (qrId) => {
  if (!qrId) {
    throw new Error("qrId is required to fetch QR payments");
  }

  return await razorpay.qrCode.fetchPayments(qrId);
};
