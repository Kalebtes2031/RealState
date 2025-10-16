import { View, Text } from "react-native";
import React, { createContext, useContext, ReactNode, useState } from "react";
import type { User } from "@/types/User";

interface GlobalContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLogged: boolean;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  refetch: () => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const refetch = () => {
    console.log(user);
    console.log(setUser);
    console.log(setLoading);
  };

  const isLogged = !!user;
  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };


  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        setUser,
        loading,
        refetch,
        login,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
