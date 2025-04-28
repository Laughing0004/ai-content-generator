import React, { createContext, useState, ReactNode } from "react";

export interface TotalUsageContextType {
  totalUsage: number;
  setTotalUsage: (usage: number) => void;
}

export const TotalUsageContext = createContext<TotalUsageContextType | null>(null);

export const TotalUsageProvider = ({ children }: { children: ReactNode }) => {
  const [totalUsage, setTotalUsage] = useState<number>(0);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      {children}
    </TotalUsageContext.Provider>
  );
};
