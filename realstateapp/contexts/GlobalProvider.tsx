//realstatapp/contexts/GlobalProvider.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import api from "@/utils/api";
import type { User } from "@/types/User";

interface GlobalContextType {
  user: User | null;
  isLogged: boolean;
  loading: boolean;       // session restoration
  loginLoading: boolean;  // login process
  emailLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const ACCESS_TOKEN_KEY = "realstate_access_token";

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const isLogged = !!user;

  // Restore session on app load
  useEffect(() => {
    const restoreSession = async () => {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      if (token) {
        try {
          const res = await api.get("/me/");
          const data = res.data;
          setUser({
            $id: data.id.toString(),
            name: data.display_name || data.email.split("@")[0],
            email: data.email,
            avatar:
              data.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                data.display_name || data.email.split("@")[0]
              )}`,
          });
        } catch (err) {
          console.log("Failed to restore session:", err);
          await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
          setUser(null);
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  // Email/password login
  const emailLogin = async (email: string, password: string) => {
    setLoginLoading(true);
    try {
      const res = await api.post("/auth/login/", { email, password });
      const { access } = res.data;

      // Save access token
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);

      // Fetch user info from /me/ for consistency
      const meRes = await api.get("/me/");
      const data = meRes.data;

      setUser({
        $id: data.id.toString(),
        name: data.display_name || data.username,
        email: data.email,
        avatar:
          data.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            data.display_name || data.email.split("@")[0]
          )}`,
      });
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  };

  return (
    <GlobalContext.Provider
      value={{ user, isLogged, loading, loginLoading, emailLogin, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
};

export default GlobalProvider;
