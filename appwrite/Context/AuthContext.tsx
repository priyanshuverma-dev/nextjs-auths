"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Models } from "appwrite";
import { getSession } from "@/libs/auth";
import LoadingModal from "@/app/(components)/loadingModal";
import { account } from "@/libs/appwrite";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: Models.Document | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
  logout: async () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Models.Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getSession();
        if (currentUser === null) {
          setUser(null);
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error retrieving user session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
