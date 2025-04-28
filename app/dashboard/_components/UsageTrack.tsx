"use client";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

// Define the structure of AIOutput
interface AIOutputType {
  createdBy: string;
  aiResponse: string | null; // Adjust based on your database schema
  // Add other fields if necessary
}

// Define the structure of UserSubscription
interface UserSubscriptionType {
  email: string;
  // Add other fields if necessary
}

function UsageTrack() {
  const { user } = useUser();
  const router = useRouter(); // Initialize router

  // Accessing the TotalUsageContext
  const totalUsageContext = useContext(TotalUsageContext);
  if (!totalUsageContext) {
    throw new Error("TotalUsageContext is not provided");
  }
  const { totalUsage, setTotalUsage } = totalUsageContext;

  // Accessing the UserSubscriptionContext
  const userSubscriptionContext = useContext(UserSubscriptionContext);
  if (!userSubscriptionContext) {
    throw new Error("UserSubscriptionContext is not provided");
  }
  const { isUserSubscribed, setIsUserSubscribed } = userSubscriptionContext;

  const [maxWords, setMaxWords] = useState(10000);

  useEffect(() => {
    if (user) {
      GetData();
      IsUserSubscribe();
    }
  }, [user]);

  // Fetch AIOutput data from the database
  const GetData = async () => {
    try {
      const result: AIOutputType[] = await db
        .select()
        .from(AIOutput)
        //@ts-ignore
        .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

      GetTotalUsage(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Calculate total AI output usage
  const GetTotalUsage = (result: AIOutputType[]) => {
    let total = 0;
    result.forEach((element) => {
      total += Number(element.aiResponse?.length || 0);
    });

    setTotalUsage(total);
  };

  // Check if the user is subscribed
  const IsUserSubscribe = async () => {
    try {
      const result: UserSubscriptionType[] = await db
        .select()
        .from(UserSubscription)
        //@ts-ignore
        .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));

      if (result.length > 0) {
        setIsUserSubscribed(true);
        setMaxWords(1000000); // Increase max words for subscribed users
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  return (
    <div className="p-5">
      {/* Usage Progress Section */}
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${(totalUsage / maxWords) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} Credit Used
        </h2>
      </div>

      {/* Upgrade Button */}
      <div>
        <Button
          variant={"secondary"}
          className="w-full my-3 text-primary"
          onClick={() => router.push("/dashboard/billing")} // Navigate to billing page
        >
          Upgrade
        </Button>
      </div>
    </div>
  );
}

export default UsageTrack;
