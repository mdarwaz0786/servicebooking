import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Customer create करने का function
export const createOrGetRazorpayCustomer = async (userData) => {
  try {
    const { userId, name, email, contact } = userData;

    // Check if customer already exists by email or contact
    // Note: Razorpay doesn't have a direct API to fetch by email/phone
    // So you might want to store razorpayCustomerId in your User model

    const timestamp = Date.now();
    const uniqueEmail = `${email.split('@')[0]}+${timestamp}@${email.split('@')[1] || 'example.com'}`;

    // Create new customer
    const customer = await razorpay.customers.create({
      name: `Customer_${userId}_${timestamp}`,
      email: uniqueEmail || `${userId}@example.com`,
      contact: `9${Math.floor(Math.random() * 1000000000)}`.slice(0, 10),
      notes: {
        userId: userId.toString(),
      },
    });

    // console.log("Razorpay customer created:", customer.id);
    return customer;
  } catch (error) {
    // console.error("Error creating Razorpay customer:", error);
    throw error;
  }
};

// Updated QR creation function with customer
export const createScanAndPayQr = async (
  amount,
  referenceId,
  userData, // Now accepting full user data
  description = "Scan & Pay",
) => {
  try {
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount for QR code");
    }

    if (!referenceId) {
      throw new Error("referenceId is required for QR code");
    }

    // Create or get customer
    const customer = await createOrGetRazorpayCustomer(userData);

    // console.log("Creating QR with:", {
    //   amount,
    //   referenceId,
    //   customerId: customer.id,
    //   description,
    // });

    const qr = await razorpay.qrCode.create({
      type: "upi_qr",
      name: referenceId,
      usage: "single_use",
      fixed_amount: true,
      payment_amount: Math.round(amount * 100),
      description,
      customer_id: customer.id, // Use razorpay customer ID
      notes: {
        reference_id: referenceId,
        userId: userData.userId,
      },
    });

    // console.log("QR created successfully:", qr.id);

    return {
      ...qr,
      razorpayCustomerId: customer.id,
      shortId: qr.image_url ? qr?.image_url.split("/").pop() : '',
    };
  } catch (error) {
    console.error(
      "Razorpay QR creation failed:",
      error?.error || error?.message || error
    );
    throw error;
  }
};


export const createPaymentLink = async (
  amount,
  referenceId,
  userData,
  description = "Payment for Ride",
  options = {}
) => {
  try {
    // Validate input parameters
    if (!amount || amount <= 0 || isNaN(amount)) {
      throw new Error("Invalid amount. Amount must be a positive number.");
    }

    if (!referenceId || typeof referenceId !== 'string' || referenceId.trim() === '') {
      throw new Error("Valid referenceId is required");
    }

    if (!userData || !userData.userId) {
      throw new Error("User data with userId is required");
    }

    // Convert to paise (Razorpay requirement)
    const amountInPaise = Math.round(amount * 100);
    if (amountInPaise < 100) { // Minimum ₹1
      throw new Error("Amount must be at least ₹1");
    }

    // console.log("Creating Payment Link with parameters:", {
    //   amount: amount,
    //   amountInPaise: amountInPaise,
    //   referenceId: referenceId,
    //   userId: userData.userId,
    //   description: description
    // });

    // Create or get customer
    const customer = await createOrGetRazorpayCustomer(userData);

    if (!customer || !customer.id) {
      throw new Error("Failed to create/get Razorpay customer");
    }

    // console.log("Using Razorpay customer ID:", customer.id);

    // Prepare payment link parameters
    const paymentLinkParams = {
      amount: amountInPaise,
      currency: "INR",
      accept_partial: false,
      description: description,
      customer: {
        name: userData.name || "Customer",
        email: userData.email || "",
        contact: '8285392948' || ""
      },
      notify: {
        sms: false,
        email: false
      },
      reminder_enable: true,
      // UPI and other payment methods
      upi_link: true,
      // Optional: Enable other payment methods
      // callback_url: "https://yourdomain.com/payment-callback",
      // callback_method: "get",
      notes: {
        reference_id: referenceId,
        userId: userData.userId,
        userEmail: userData.email || '',
        userPhone: userData.contact || '',
        timestamp: new Date().toISOString(),
        type: "ride_payment"
      },
      // Auto-expire after 30 minutes
      expire_by: Math.floor(Date.now() / 1000) + (30 * 60)
    };

    // Add optional parameters
    if (options.callbackUrl) {
      paymentLinkParams.callback_url = options.callbackUrl;
      paymentLinkParams.callback_method = options.callbackMethod || "get";
    }

    if (options.expiryMinutes) {
      paymentLinkParams.expire_by = Math.floor(Date.now() / 1000) + (options.expiryMinutes * 60);
    }

    // console.log("Payment Link creation params:", JSON.stringify(paymentLinkParams, null, 2));

    // Create Payment Link
    const paymentLink = await razorpay.paymentLink.create(paymentLinkParams);

    // console.log("Payment Link created successfully:", {
    //   linkId: paymentLink.id,
    //   shortUrl: paymentLink.short_url,
    //   status: paymentLink.status,
    //   amount: paymentLink.amount / 100
    // });

    // Return enhanced response
    return {
      success: true,
      paymentLinkId: paymentLink.id,
      referenceId: referenceId,
      amount: amount,
      amountInPaise: amountInPaise,
      shortUrl: paymentLink.short_url,
      longUrl: paymentLink.long_url,
      status: paymentLink.status,
      razorpayCustomerId: customer.id,
      expiryTime: paymentLink.expire_by ? new Date(paymentLink.expire_by * 1000) : null,
      acceptPaymentMethods: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true
      },
      metadata: {
        createdAt: new Date().toISOString(),
        notes: paymentLinkParams.notes
      }
    };

  } catch (error) {
    // console.error("Razorpay Payment Link creation failed:", {
    //   error: error.message,
    //   stack: error.stack,
    //   referenceId: referenceId,
    //   amount: amount,
    //   userId: userData?.userId
    // });

    // Throw user-friendly error
    if (error.error && error.error.description) {
      throw new Error(`Razorpay Error: ${error.error.description}`);
    }

    throw new Error(`Payment Link creation failed: ${error.message}`);
  }
};

export const fetchQrPayments = async (qrId) => {
  if (!qrId) {
    throw new Error("qrId is required to fetch QR payments");
  }

  return await razorpay.qrCode.fetchPayments(qrId);
};


