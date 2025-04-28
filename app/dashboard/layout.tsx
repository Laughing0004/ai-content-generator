// app/dashboard/layout.tsx
"use client";
import React from "react";
import { TotalUsageProvider } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionProvider } from "@/app/(context)/UserSubscriptionContext";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserSubscriptionProvider>
      <TotalUsageProvider>
        <div className="bg-slate-100 h-screen">
          <div className="md:w-64 hidden md:block fixed">
            <SideNav />
          </div>
          <div className="md:ml-64">
            <Header />
            {children} {/* The child components will have access to the contexts */}
          </div>
        </div>
      </TotalUsageProvider>
    </UserSubscriptionProvider>
  );
};

export default DashboardLayout;
