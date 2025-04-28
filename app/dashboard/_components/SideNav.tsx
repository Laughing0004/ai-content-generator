"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import UsageTrack from "./UsageTrack";

function SideNav() {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Image src={"/logo.svg"} alt="logo" width={37.5} height={60} />
      </div>
      <hr className="my-6 border" />
      <div className="mt-3">
        {MenuList.map((menu) => (
          <div
            key={menu.path} // Path should be unique
            className={`flex gap-2 mb-2 p-3 text-black hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
              path === menu.path && "bg-primary text-white"
            }`}
            onClick={() => router.push(menu.path)} // Navigate to the specified path
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
