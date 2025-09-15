import { useState } from "react";
import axios from "axios";

const Test = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // STEP 1: Create Razorpay Order from backend
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/common/payment/create-order",
        { userId: "68bff314cf69278a146494f6" },
      );

      if (!data.success) throw new Error("Failed to create order");

      const { order } = data;

      // STEP 2: Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Service Booking",
        description: "Complete your payment",
        order_id: order.id,
        handler: async function (response) {
          // STEP 3: Verify Payment + Create Booking
          const verifyRes = await axios.post(
            "http://localhost:8080/api/v1/common/payment/verify-payment",
            {
              ...response, // razorpay_order_id, razorpay_payment_id, razorpay_signature
              addressId: "68c50a4740d4bc119077fea0",
              scheduleType: 1,
              scheduleDate: new Date(),
              scheduleTime: "10:00 AM",
              isCouponUsed: 0,
              userId: "68bff314cf69278a146494f6"
            },
          );

          if (verifyRes.data.success) {
            alert("✅ Booking successful!");
          } else {
            alert("❌ Payment verification failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      style={{ padding: "10px 20px", background: "#3399cc", color: "#fff", border: "none" }}
    >
      {loading ? "Processing..." : "Pay & Book"}
    </button>
  );
};

export default Test;