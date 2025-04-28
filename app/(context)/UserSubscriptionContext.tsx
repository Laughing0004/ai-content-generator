// app/(context)/UserSubscriptionContext.tsx
"use client";
import React, { createContext, useState, ReactNode } from "react";

// Define the type for the user subscription context
interface UserSubscriptionContextType {
  isUserSubscribed: boolean;
  setIsUserSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserSubscriptionContext = createContext<UserSubscriptionContextType | null>(null);

interface UserSubscriptionProviderProps {
  children: ReactNode;
}

export const UserSubscriptionProvider = ({ children }: UserSubscriptionProviderProps) => {
  const [isUserSubscribed, setIsUserSubscribed] = useState<boolean>(false);

  return (
    <UserSubscriptionContext.Provider value={{ isUserSubscribed, setIsUserSubscribed }}>
      {children}
    </UserSubscriptionContext.Provider>
  );
};
