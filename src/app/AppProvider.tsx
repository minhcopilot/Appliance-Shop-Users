"use client";
import { useContext, useState, createContext } from "react";
import React from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  photo: string | null;
  birthday: string;
  email: string;
  passwordChangedAt: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: string | null;
  roleCode: string;
}

interface AppContextValue {
  sessionToken: string;
  setSessionToken: (sessionToken: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextValue>({
  sessionToken: "",
  setSessionToken: () => {},
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  const [user, setUser] = useState<User | null>(null);
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <AppContext.Provider
      value={{ sessionToken, setSessionToken, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
}
