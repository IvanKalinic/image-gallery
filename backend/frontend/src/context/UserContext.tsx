import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks";

type ContextType = {
  user: { email: string; password: string };
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const UserContext = createContext<ContextType>({
  user: { email: "", password: "" },
  setUser: () => null,
});

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (userContext === undefined) {
    throw new Error("useUser must be inside of its provider");
  }
  return userContext;
};

interface Props {
  children: React.ReactChild;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage("user", { email: "", password: "" });

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
