import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../../lib/types/user";

interface GlobalInterface {
  authMember: User | null;
  setAuthMember: (user: User | null) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error("useGlobals must be used within a GlobalProvider");
  return context;
};
