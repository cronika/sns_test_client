import React, { ReactNode, useContext, useEffect, useState } from "react";
import apiClient from "../lib/apiClient";

interface AuthContextType {
  user: null | {
    id: number;
    email: string;
    username: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      apiClient
        .get("/users/find")
        .then((res) => {
          // console.log(res.data); // レスポンス全体をログ出力
          if (res.data && res.data.user) {
            setUser(res.data.user);
          } else {
            console.error("Unexpected response structure:", res.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
      apiClient.get("/users/find").then((res) => {
        setUser(res.data.user);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
