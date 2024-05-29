import { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { User } from "../../../lib/types/user";
import { GlobalContext } from "../../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) localStorage.removeItem("userData");

  const [authMember, setAuthMember] = useState<User | null>(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") as string)
      : null
  );

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
