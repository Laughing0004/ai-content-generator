"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Script from "next/script";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { UserSubscription } from "@/utils/schema";
import { db } from "@/utils/db";
import moment from "moment";

function Billing() {
  const [loading, setLoading] = useState(false);
  const [isPlanActive, setIsPlanActive] = useState(false); // State to track active subscription
  const { user } = useUser();

  useEffect(() => {
    CheckActiveSubscription();
  }, [user]);

  // Check if user has an active subscription
  const CheckActiveSubscription = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(UserSubscription)
        
        .where({
          //@ts-ignore
          email: user.primaryEmailAddress.emailAddress,
          active: true,
        });

      if (result.length > 0) {
        setIsPlanActive(true);
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
    }
  };

  // Create Subscription
  const CreateSubscription = () => {
    setLoading(true);

    axios
      .post("/api/create-subscription", {})
      .then((resp) => {
        console.log("Subscription Created:", resp.data);
        OnPayment(resp.data.id); // Trigger Razorpay payment
      })
      .catch((error) => {
        console.error("Error creating subscription:", error.response || error.message);
        alert("Failed to create subscription. Please try again.");
        setLoading(false);
      });
  };

  // Razorpay Payment Handler
  const OnPayment = (subsId: string) => {
    //@ts-ignore
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded");
      alert("Payment gateway is not available. Please refresh the page and try again.");
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      subscription_id: subsId,
      name: "AI Content Generator",
      description: "Monthly Subscription",
      image: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
      handler: async (resp: any) => {
        console.log("Payment successful:", resp);
        if (resp) {
          await SaveSubscription(resp?.razorpay_payment_id);
        }
        setLoading(false);
      },
      theme: { color: "#7C3AED" },
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Save Subscription to Database
  const SaveSubscription = async (paymentId: string) => {
    if (!paymentId || !user?.primaryEmailAddress?.emailAddress || !user?.fullName) {
      console.error("Missing data for subscription saving");
      alert("Unable to save subscription. Please contact support.");
      return;
    }

    try {
      const result = await db.insert(UserSubscription).values({
        email: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
        active: true,
        paymentId,
        joinDate: moment().format("DD/MM/YYYY"),
      });
      console.log("Subscription saved:", result);
      setIsPlanActive(true); // Mark plan as active
      alert("Subscription activated successfully!");
    } catch (error) {
      console.error("Error saving subscription:", error);
      alert("Failed to save subscription. Please contact support.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f4f6] to-white py-10 px-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-black">Upgrade With Monthly Plan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-left">
            <h3 className="text-xl text-black font-semibold mb-2">Free</h3>
            <p className="text-3xl text-black font-bold mb-4">
              0$ <span className="text-sm text-black">/month</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-800">
              <li>✅ 10,000 Words/Month</li>
              <li>✅ 50+ Content Templates</li>
              <li>✅ Unlimited Download & Copy</li>
              <li>✅ 1 Month of History</li>
            </ul>
            <button
              className="mt-6 w-full bg-gray-300 border-2 border-violet-600 hover:opacity-90 text-black rounded-full py-2 text-base font-medium"
              disabled
            >
              Current Plan
            </button>
          </div>

          {/* Monthly Plan Card */}
          <div className="bg-white border-2 border-violet-600 rounded-3xl shadow-lg p-8 text-left">
            <h3 className="text-xl text-black font-semibold mb-2">Monthly</h3>
            <p className="text-3xl text-black font-bold mb-4">
              9.99$ <span className="text-sm text-black">/month</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-800">
              <li>✅ 1,00,000 Words/Month</li>
              <li>✅ 50+ Template Access</li>
              <li>✅ Unlimited Download & Copy</li>
              <li>✅ 1 Year of History</li>
            </ul>
            <button
              disabled={isPlanActive || loading}
              onClick={CreateSubscription}
              className={`mt-6 w-full ${
                isPlanActive
                  ? "bg-gray-300 text-black cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white"
              } rounded-full py-2 text-base font-medium`}
            >
              {loading && <Loader2Icon className="animate-spin inline-block mr-2" />}
              {isPlanActive ? "Active Plan" : loading ? "Processing..." : "Activate Plan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
