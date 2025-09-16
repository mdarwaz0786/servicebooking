import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";


const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

export const handlePayment = async ({ pId, type, createUrl, verifyUrl, toast }) => {
  try {
    const { data } = await axios.post(createUrl, { pId, type });

    if (!data.success) throw new Error("Failed to create order");

    const { order, transactionDetail } = data;

    return new Promise((resolve) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Service Booking",
        description: "Complete your payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(verifyUrl, {
              ...response,
              transactionTableId: transactionDetail._id,
            });

            if (verifyRes.data.success) {
              toast.success("Booking successful!");
              resolve(true); // ✅ success
            } else {
              toast.error("Payment verification failed");
              resolve(false); // ❌ fail
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Something went wrong with verification");
            resolve(false);
          }
        },
        prefill: {
          name: "Booking",
          email: "abc@example.com",
          contact: "1122334455",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment was cancelled");
            resolve(false); // 👈 return false so PaymentMethod can redirect
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        toast.error("Payment failed. Try again.");
        resolve(false);
      });
      rzp.open();
    });
  } catch (error) {
    console.error(error);
    toast.error("Payment initiation failed. Try again.");
    return false;
  }
};


