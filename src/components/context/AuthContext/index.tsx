"use client";
import React, { useEffect } from "react";
import {
  AuthContextInterface,
  AuthContextProviderProps,
  User,
} from "./interface";
import { usePathname, useRouter } from "next/navigation";

export const AuthContext = React.createContext({} as AuthContextInterface);

export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState({} as User);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const router = useRouter();
  const urlPath = usePathname();
  const NON_AUTH_PAGE = ["/", "/auth/login", "/auth/signup"];

  const getAccessToken = () => localStorage.getItem("accessToken") || "";
  const setAccessToken = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  };

  const saveUser = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return {} as User;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser({} as User);
    router.push("/");
  };

  useEffect(() => {
    if (NON_AUTH_PAGE.includes(urlPath)) {
      return;
    }
    const token = getAccessToken();
    if (token) {
      setIsAuthenticated(true);
      const user = getUser();
      saveUser(user);
    } else {
      setIsAuthenticated(false);
      router.push("/");
    }
  }, []);

  const initValue = {
    user,
    setUser: saveUser,
    isAuthenticated,
    setIsAuthenticated,
    getAccessToken,
    setAccessToken,
    logout,
  };
  return (
    <AuthContext.Provider value={initValue}>{children}</AuthContext.Provider>
  );
};
