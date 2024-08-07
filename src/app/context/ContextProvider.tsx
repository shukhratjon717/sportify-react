import React, { ReactNode, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { User } from "../../lib/types/user";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();

  useEffect(() => {
    if (!cookies.get("accessToken")) {
      localStorage.removeItem("userData");
    }
  }, [cookies]);

  const [authMember, setAuthMember] = useState<User | null>(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  console.log("=== verify ===");

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
