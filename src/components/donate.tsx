"use client";

import { useState } from "react";
import Script from "next/script";

// Define TypeScript interfaces for Razorpay
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    order_id: string;
    payment_id: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: <T extends "payment.failed">(
    event: T,
    handler: T extends "payment.failed" 
      ? (response: RazorpayError) => void 
      : never
  ) => void;
  close: () => void;
}

// Declare Razorpay on window object
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function Donate() {
  const [amount, setAmount] = useState<number>(0);

  const createOrder = async () => {
    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      const paymentData: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: amount * 100,
        currency: "INR",
        order_id: data.id,
        name: "Donation",
        description: "Support our cause",
        handler: function (response: RazorpayResponse) {
          // Handle successful payment here
          console.log("Payment successful:", response);
          // Optionally verify payment on the server
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Create and open Razorpay instance
      if (typeof window !== "undefined") {
        const payment = new window.Razorpay(paymentData);
        payment.open();

        payment.on("payment.failed", function (response: RazorpayError) {
          console.error("Payment failed:", response);
        });
      }
    } catch (error) {
      console.error("Error during payment flow:", error);
    }
  };

  return (
    <div className="flex w-screen items-center justify-center">
      <Script
        id="razorpay-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="flex flex-col items-center gap-4">
        <input
          type="number"
          className="w-1/2 p-2 border border-gray-500 rounded-md"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber || 0)}
          placeholder="Enter amount..."
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={createOrder}
        >
          Donate
        </button>
      </div>
    </div>
  );
}